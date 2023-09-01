import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useMutation } from "@apollo/client";
import { ADD_ACTIVITY } from "../utils/mutations";
import UploadWidget from "../components/UploadWidget";
import { saveActivityId, getActivityId } from "../utils/localStorage";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AuthService from "../utils/auth";
// import { getTokenFromLocalStorage } from "../utils/authUtils";

const CreatePost = () => {
  const todayDate = dayjs().format("MMMM DD, YYYY");
  const time = dayjs().format("hh:mma");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [date, setDate] = useState(new Date());
  const token = AuthService.getToken();
  // const token = getTokenFromLocalStorage();
  console.log("Token from local storage:", token);
  const [savedActivityId, setSavedActivityId] = useState(getActivityId());

  const [addActivity] = useMutation(ADD_ACTIVITY, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  useEffect(() => {
    return () => saveActivityId(savedActivityId);
  });

  const handleImagesUpload = (imageUrl) => {
    setImages((prevImages) => [...prevImages, imageUrl]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addActivity({
        variables: {
          activityInput: {
            title: title,
            description: description,
            date: date.toISOString(),
            imageUrl: images.map((image) => image.url),
          },
        },
      });
      console.log("Mutation data:", data);
      setTitle("");
      setDescription("");
      setDate(new Date());
    } catch (err) {
      console.error("Error adding activity:", err);
      console.log(err.response);
    }
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <section>
      <article className="header">
        <h1>Habit Away!</h1>
        <h4>
          {" "}
          It's currently... {todayDate} {time}
        </h4>
        <form onSubmit={handleFormSubmit}>
          <label>Post Title</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <label>Select Date</label>
          <Calendar onChange={handleDateChange} value={date} />

          <label>What are you up to?</label>
          <textarea
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />

          <UploadWidget onImagesUpload={handleImagesUpload} />
          <button>Post your habit!</button>
        </form>
      </article>
    </section>
  );
};

export default CreatePost;
