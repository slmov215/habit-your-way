import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useQuery } from '@apollo/client';
import { GET_ACTIVITIES_BY_DATE } from '../utils/queries';
import AddActivityForm from './AddActivityForm'; // Import the AddActivityForm component
import UploadWidget from '../components/UploadWidget';

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [uploadedImage, setUploadedImage] = useState(null);
  const { loading, data } = useQuery(GET_ACTIVITIES_BY_DATE, {
    variables: { date: selectedDate },
  });

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleAddActivity = (newActivity) => {
   
  };

  const handleImageUpload = (imageUrl) => {
    setUploadedImage(imageUrl);
  };

  return (
    <div>
      <Calendar value={selectedDate} onClickDay={handleDateSelect} />
      <h2>Activities for {selectedDate.toLocaleDateString()}</h2>
      <ul>
        {loading ? (
          <p>Loading activities...</p>
        ) : (
          data && data.activities ? (
            data.activities.map((activity) => (
              <li key={activity.id}>{activity.title}</li>
            ))
          ) : (
            <p>No activities found for this date.</p>
          )
        )}
      </ul>
      <AddActivityForm onAddActivity={handleAddActivity} />
      <UploadWidget onImageUpload={handleImageUpload} />
    </div>
  );
};

export default MyCalendar;
