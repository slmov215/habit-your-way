import React, { useState, useEffect } from "react";
import Bar from "../components/Bar.jsx";
import { useQuery } from "@apollo/client";
import { GET_ACTIVITIES_BY_USER } from "../utils/queries";
import AuthService from "../utils/auth.js"; 

export default function Home() {
  const authToken = AuthService.getToken(); // Get the token from local storage or cookie
  // console.log('Token:', authToken);
  // const authHeader = authToken ? { Authorization: `Bearer ${authToken}` } : {};

  const { loading, error, data } = useQuery(GET_ACTIVITIES_BY_USER, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    // headers: authHeader, // Include the token in the headers
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const activities = data.getActivitiesByUser;

  return (
    <div>
      <Bar />
      <div>
        <h2>Previous Activities</h2>
        {/* <ul>
          {activities.map((activity) => (
            <li key={activity._id}>
              <h3>{activity.title}</h3>
              <p>{activity.description}</p>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
}
// needs some adjustment, throw 500 errors

// import React from 'react';
// import { useQuery } from '@apollo/client';
// import { GET_ACTIVITIES } from '../utils/queries';
// import ActivityList from '../components/ActivityList';

// const Home = () => {
//   const { loading, error, data } = useQuery(GET_ACTIVITIES);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error fetching activities: {error.message}</div>;
//   }

//   const activities = data.activities;

//   return (
//     <div>
//       <h2>Home</h2>
//       <ActivityList activities={activities} />
//     </div>
//   );
// };

// export default Home;
