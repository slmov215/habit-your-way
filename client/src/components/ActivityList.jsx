import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ACTIVITIES } from '../utils/queries';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import '../assets/ActivityList.css';

const ActivityList = () => {
  const { loading, error, data } = useQuery(GET_ACTIVITIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const activities = data.activities;

  // Set the locale to 'en'
  dayjs.locale('en');

  return (
    <div>
      <ul>
        {activities.map(activity => {
          const formattedDate = dayjs(activity.date).format('MMMM DD, YYYY');
          const formattedTime = dayjs(activity.date).format('hh:mma');

          return (
            <li key={activity._id}>
              <div className="card" style={{ width: '20rem' }}>
                <h3 className="card-title text-center">{activity.title}</h3>
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
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ActivityList;
