import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ACTIVITIES } from '../utils/queries';
import { EDIT_ACTIVITY, DELETE_ACTIVITY } from '../utils/mutations';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import '../assets/ActivityList.css';

const ActivityList = () => {
  const { loading, error, data } = useQuery(GET_ACTIVITIES);

  const [isEditing, setIsEditing] = useState(false);
  const [editActivityId, setEditActivityId] = useState(null);
  const [editedActivityTitle, setEditedActivityTitle] = useState(''); // State for edited title

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const activities = data.activities;

  const [editActivity] = useMutation(EDIT_ACTIVITY);
  const [deleteActivity] = useMutation(DELETE_ACTIVITY);

  const handleEdit = (activityId) => {
    const activityToEdit = activities.find((activity) => activity._id === activityId);

    setIsEditing(true); // Enable edit mode
    setEditActivityId(activityId);
    setEditedActivityTitle(activityToEdit.title); // Set the edited title to the current activity's title
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Disable edit mode
    setEditActivityId(null);
    setEditedActivityTitle(''); // Reset the edited title
  };

  // const handleSaveEdit = async (activityId, updatedData) => {
  //   try {
  //     const response = await editActivity({
  //       variables: { activityId, activityInput: updatedData },
  //     });
  
  //     // Handle the response if needed
  //     const editedActivity = response.data.editActivity; // Access the edited activity data
  
  //     setIsEditing(false);
  //     setEditActivityId(null);
  //     setEditedActivityTitle('');
  //   } catch (error) {
  //     console.error('Error editing activity:', error);
  //   }
  // };

  // const handleDelete = async (activityId) => {
  //   try {
  //     const response = await deleteActivity({
  //       variables: { activityId },
  //     });
  
  //     // Handle the response if needed
  //     const deleteResult = response.data.deleteActivity; // Access the result of the delete operation
  
  //     if (deleteResult) {
  //       // Handle success
  //     } else {
  //       // Handle failure
  //     }
  //   } catch (error) {
  //     console.error('Error deleting activity:', error);
  //   }
  // };

  dayjs.locale('en');

  return (
    <div>
      <ul>
        {activities.map((activity) => {
          const formattedDate = dayjs(activity.date).format('MMMM DD, YYYY');
          const formattedTime = dayjs(activity.date).format('hh:mma');

          return (
            <li key={activity._id}>
              <div className="card" style={{ width: '20rem' }}>
                <h3 className="card-title text-center">
                  {isEditing && editActivityId === activity._id ? (
                    // When in edit mode for this activity, show an input form
                    <input
                      type="text"
                      value={editedActivityTitle}
                      onChange={(e) => setEditedActivityTitle(e.target.value)}
                    />
                  ) : (
                    // When not in edit mode, show the activity title
                    activity.title
                  )}
                </h3>
                {activity.imageUrl && (
                  <img
                    src={activity.imageUrl}
                    alt="Activity"
                    style={{ width: '12rem', margin: '0 auto' }}
                  />
                )}
                <p className="card-body">{activity.description}</p>
                <p className="card-subtitle card-footer">
                  Posted at: {formattedDate} at {formattedTime}
                </p>
                {isEditing && editActivityId === activity._id ? (
                  // When in edit mode for this activity, show save and cancel buttons
                  <>
                    <button onClick={() => handleSaveEdit(activity._id, { title: editedActivityTitle })}>
                      Save
                    </button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  // When not in edit mode, show edit and delete buttons
                  <>
                    {/* <button onClick={() => handleEdit(activity._id)}>Edit</button> */}
                    {/* <button onClick={() => handleDelete(activity._id)}>Delete</button> */}
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ActivityList;
