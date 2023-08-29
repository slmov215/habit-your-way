import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ACTIVITY } from '../utils/mutations';

const AddActivityForm = ({ onAddActivity }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const [addActivity] = useMutation(ADD_ACTIVITY);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addActivity({
        variables: {
          activityInput: {
            title: title,
            description: description,
            date: selectedDate, // You need to define selectedDate
          },
          image: selectedImage,
        },
      });

      // Call the parent component's function to update the list of activities
      onAddActivity(data.addActivity);

      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  };

  return (
    <div>
      <h3>Add New Activity</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
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
        <button type="submit">Add Activity</button>
        
      </form>
    </div>
  );
};

export default AddActivityForm;
