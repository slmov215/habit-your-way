import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_GOALS } from "../utils/queries";
import { CREATE_GOAL } from "../utils/mutations";
import AuthService from "../utils/auth";

function GoalManagement() {
  const [goalInput, setGoalInput] = useState({
    name: "",
    description: "",
    dueDate: "",
    activityId: "",
  });

  const [selectedActivity, setSelectedActivity] = useState("");
  const [createdGoal, setCreatedGoal] = useState(null); 

  const { loading, error, data, refetch } = useQuery(GET_GOALS, {
    variables: { userId: AuthService.getUserId() },
  });

  const [createGoal] = useMutation(CREATE_GOAL);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "activityId") {
      setSelectedActivity(value);
    } else {
      setGoalInput({ ...goalInput, [name]: value });
    }
  };

  const createNewGoal = async () => {
    try {
      const { data: { createGoal: newGoal } } = await createGoal({
        variables: {
          goalInput: {
            ...goalInput,
            activityId: selectedActivity,
          },
        },
      });
      setCreatedGoal(newGoal);
      setGoalInput({
        name: "",
        description: "",
        dueDate: "",
        activityId: "",
      });
      setSelectedActivity("");
      refetch();
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Goal Management</h2>
      <form onSubmit={createNewGoal}>
        <label>
          Goal Name:
          <input
            type="text"
            name="name"
            value={goalInput.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={goalInput.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Due Date:
          <input
            type="date"
            name="dueDate"
            value={goalInput.dueDate}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Activity:
          <select
            name="activityId"
            value={selectedActivity} // Use selectedActivity as the value
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select an activity
            </option>
            {data.activities && data.activities.map((activity) => (
              <option key={activity._id} value={activity._id}>
                {activity.title}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Create Goal</button>
      </form>
      {createdGoal && ( // Display the created goal if it exists
        <div>
          <h3>Created Goal:</h3>
          <p>Name: {createdGoal.name}</p>
          <p>Description: {createdGoal.description}</p>
          <p>Due Date: {createdGoal.dueDate}</p>
          <p>Activity: {createdGoal.activityId}</p>
        </div>
      )}
      {data.goals.map((goal) => (
        <div key={goal._id}>
          <p>{goal.name}</p>
          {/* Display other goal details */}
        </div>
      ))}
    </div>
  );
}

export default GoalManagement;
