import React from 'react';
import EditActivityForm from './EditActivityForm'; // Import the EditActivityForm component

const ActivityList = ({ activities, loggedInUserId, handleEditClick }) => {
  return (
    <div>
      {activities.map((activity) => (
        <div key={activity._id}>
          <h3>{activity.title}</h3>
          <p>{activity.description}</p>
          {activity.user._id === loggedInUserId && (
            <div>
              <button onClick={() => handleEditClick(activity._id)}>Edit</button>
              {/* Render the EditActivityForm component */}
              <EditActivityForm activity={activity} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ActivityList;
