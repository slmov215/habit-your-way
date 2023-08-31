import React from "react";
import Bar from "../components/Bar";
import { useQuery } from "@apollo/client";
import { GET_ACTIVITIES_BY_USER } from "../utils/queries"; // Make sure this query is defined in your queries file
import ActivityList from "../components/ActivityList"; // Import the ActivityList component
import AuthService from "../utils/auth"; 

export default function Home() {
  const authToken = AuthService.getToken(); // Get the token from local storage or cookie

  const { loading, error, data } = useQuery(GET_ACTIVITIES_BY_USER, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const activities = data.getActivitiesByUser;

  return (
    <div>
      <Bar />
      <div>
        <h2>Previous Activities</h2>
        <ActivityList activities={activities} /> {/* Pass the activities data to ActivityList */}
      </div>
    </div>
  );
}
