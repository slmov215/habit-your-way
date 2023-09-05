import React, { useState } from "react";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ACTIVITIES_BY_DATE } from "../utils/queries";
import { ADD_ACTIVITY } from "../utils/mutations";
import UploadWidget from "../components/UploadWidget";
import AuthService from "../utils/auth";
import "../assets/MyCalendar.css";

const MyCalendar = () => {
  const todayDate = dayjs().format("MMMM DD, YYYY");
  const time = dayjs().format("hh:mmA");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [uploadedImage, setUploadedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { loading, data } = useQuery(GET_ACTIVITIES_BY_DATE, {
    variables: { date: dayjs(selectedDate).format("YYYY-MM-DD") },
  });

  const [addActivity] = useMutation(ADD_ACTIVITY);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleImageUpload = (imageUrl) => {
    setUploadedImage(imageUrl);
  };

  const handleAddActivity = async () => {
    try {
      const currentUser = AuthService.getProfile();
      const { data } = await addActivity({
        variables: {
          activityInput: {
            title,
            description,
            date: selectedDate.toISOString(),
            imageUrl: uploadedImage || "",
          },
          user: currentUser.sub,
        },
      });
      console.log("Mutation data:", data);

      // Clear the form fields after adding the activity
      setTitle("");
      setDescription("");
      window.location.assign("/");
    } catch (err) {
      console.error("Error adding activity:", err);
      console.log(err.response);
    }
  };

  return (
    <div className="calendar-page">
      <h3>
        {" "}
        It's currently... {todayDate} {time}
      </h3>
      <Calendar value={selectedDate} onClickDay={handleDateSelect} />
      <h2>Activities for {selectedDate.toLocaleDateString()}</h2>
      <ul>
        {loading ? (
          <p>Loading activities...</p>
        ) : data && data.activities ? (
          data.activities.map((activity) => (
            <li key={activity.id}>{activity.title}</li>
          ))
        ) : (
          <p>No activities found for this date.</p>
        )}
      </ul>
      <div>
        <h3>Add New Activity</h3>
        <div>
          <label className="title">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button
          type="button"
          className="activity-button"
          onClick={handleAddActivity}
        >
          Add Activity
        </button>
      </div>
      <UploadWidget onImagesUpload={handleImageUpload} />
    </div>
  );
};

export default MyCalendar;
