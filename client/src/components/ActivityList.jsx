import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ACTIVITIES } from '../utils/queries';
import dayjs from 'dayjs'; // Import dayjs for date and time formatting

const ActivityList = () => {
  const { loading, error, data } = useQuery(GET_ACTIVITIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const activities = data.activities; // Assuming your query returns activities

  return (
    <div>
      <h2>Activity List</h2>
      <ul>
        {activities.map(activity => {
          const formattedDate = dayjs(activity.date).format('MMMM DD, YYYY');
          const formattedTime = dayjs(activity.date).format('hh:mma');

          return (
            <li key={activity._id}>
              <h3>{activity.title}</h3>
              <p>{activity.description}</p>
              <p>Date: {formattedDate}</p>
              <p>Time: {formattedTime}</p>
              {activity.imageUrl && <img src={activity.imageUrl} alt="Activity" />}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ActivityList;
