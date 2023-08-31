import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ACTIVITIES_BY_USER } from './path-to-your-queries'; // Import your GraphQL query
import AuthService from '../utils/auth'; // Import your authentication service

function ActivityList() {
  const authToken = AuthService.getToken(); // Get the token from local storage or cookie
  const authHeader = authToken ? { Authorization: `Bearer ${authToken}` } : {};

  // Use the useQuery hook to fetch activities
  const { loading, error, data } = useQuery(GET_ACTIVITIES_BY_USER, {
    headers: authHeader, // Include the token in the headers
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const activities = data.getActivitiesByUser; // Adjust the data structure accordingly

  return (
    <div>
      <h2>Your Activities</h2>
      {activities.map(activity => (
        <div key={activity._id}>
          <h3>{activity.title}</h3>
          <p>{activity.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ActivityList;
