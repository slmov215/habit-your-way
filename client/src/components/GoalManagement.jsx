import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_GOALS } from '../utils/queries';
import { CREATE_GOAL } from '../utils/mutations';
import AuthService from '../utils/auth';

function GoalManagement() {
  // Define state variables for form inputs
  const [goalInput, setGoalInput] = useState({
    name: '',
    description: '',
    dueDate: '',
    activityId: '', // Initialize activityId as an empty string
  });

  // Fetch user's goals
  const { loading, error, data, refetch } = useQuery(GET_GOALS, {
    variables: { userId: AuthService.getUserId() },
  });

  // Create a new goal
  const [createGoal] = useMutation(CREATE_GOAL);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGoalInput({ ...goalInput, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createGoal({
        variables: {
          goalInput: goalInput, // Pass the entire goalInput object
        },
      });
      // Clear form inputs
      setGoalInput({
        name: '',
        description: '',
        dueDate: '',
        activityId: '', // Reset activityId to an empty string
      });
      // Refetch goals or update the cache as needed
      refetch();
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Goal Management</h2>
      {/* Display goals from the data variable */}
      {data.goals.map((goal) => (
        <div key={goal._id}>
          <p>{goal.name}</p>
          {/* Display other goal details */}
        </div>
      ))}
      {/* Create form for adding goals */}
      <form onSubmit={handleSubmit}>
        {/* Add form inputs for goal creation */}
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
        {/* Add a select input for choosing the activity */}
        <label>
          Activity:
          <select
            name="activityId"
            value={goalInput.activityId}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select an activity
            </option>
            {data.activities.map((activity) => (
              <option key={activity._id} value={activity._id}>
                {activity.title}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Create Goal</button>
      </form>
    </div>
  );
}

export default GoalManagement;
