import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from "@apollo/client";
import { GET_ACTIVITIES } from '../utils/queries';
import { EDIT_ACTIVITY } from '../utils/mutations';
import { DELETE_ACTIVITY } from '../utils/mutations';
import { updateActivityId } from "../utils/localStorage";
import { removeActivityId } from "../utils/localStorage";

const Activity = ({ activities }) => {
        if (!activities.length){
            return <h4>No Activities Posted</h4>
        }

    // const [editActivity] = useMutation(EDIT_ACTIVITY);
    // const [deleteActivity] = useMutation(DELETE_ACTIVITY);
    // const { loading, data } = useQuery(GET_ACTIVITIES);
    // const activities = data.activities || [];

    // const handleDeleteActivity = async(activityId) => {
    //     try {
    //         const { data } = await deleteActivity({
    //             variables: { activityInput },
    //         });
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };


    return(
        <>
        <div className="activity-list">
            {activities &&
                activities.map((activity) => (
                    <h4>{activity.title} <br />
                        <p>{activity.description}</p>
                        <p>{activity.date}</p>
                    </h4>
                ))}
        </div>
        </>
    );
};

export default Activity;