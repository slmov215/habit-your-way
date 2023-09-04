import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ACTIVITIES } from '../utils/queries';
import dayjs from 'dayjs'; 
import 'dayjs/locale/en'; 
import '../assets/ActivityList.css'

const ActivityList = () => {
  const { loading, error, data } = useQuery(GET_ACTIVITIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const activities = data.activities; // Assuming your query returns activities

  // Set the locale to 'en'
  dayjs.locale('en');

  return (
    <div>
      <ul>
        {activities.map(activity => {
          // Log raw date and time for debugging
          console.log('Raw Date:', activity.date);

          // Parse the date and time using dayjs
          const formattedDate = dayjs(activity.date).format('MMMM DD, YYYY');
          const formattedTime = dayjs(activity.date).format('hh:mma');

          // Log formatted date and time for debugging
          console.log('Formatted Date:', formattedDate);
          console.log('Formatted Time:', formattedTime);

          return (
            <li key={activity._id}>
              <h3>{activity.title}</h3>
              {activity.imageUrl && <img src={activity.imageUrl} alt="Activity" style={{ width: '12rem'}}/>}
              <p>{activity.description}</p>
              <p>Posted at: {formattedDate} at {formattedTime}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ActivityList;
