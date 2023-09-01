import React, { useState } from "react";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ACTIVITIES_BY_DATE } from "../utils/queries";
import { ADD_ACTIVITY } from "../utils/mutations";
import AddActivityForm from "./AddActivityForm"; // Import the AddActivityForm component
import UploadWidget from "../components/UploadWidget";

const MyCalendar = () => {
  const todayDate = dayjs().format("MMMM DD, YYYY");
  const time = dayjs().format("hh:mma");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [uploadedImage, setUploadedImage] = useState(null);
  const { loading, data } = useQuery(GET_ACTIVITIES_BY_DATE, {
    variables: { date: selectedDate },
  });

  const [addActivity] = useMutation(ADD_ACTIVITY);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleImageUpload = (imageUrl) => {
    setUploadedImage(imageUrl);
  };

  const handleAddActivity = async (newActivity) => {
    try {
      const { data } = await addActivity({
        variables: {
          activityInput: {
            title: newActivity.title,
            description: newActivity.description,
            date: selectedDate.toISOString(),
            imageUrl: uploadedImage || '',
          },
        },
      });
      console.log("Mutation data:", data);
    } catch (err) {
      console.error("Error adding activity:", err);
      console.log(err.response);
    }
  };

  return (
    <div>
      <h4>
        {" "}
        It's currently... {todayDate} {time}
      </h4>
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
      <AddActivityForm
        onAddActivity={handleAddActivity}
        selectedDate={selectedDate}
        selectedImage={uploadedImage}
      />
      <UploadWidget onImagesUpload={handleImageUpload} />
    </div>
  );
};

export default MyCalendar;
