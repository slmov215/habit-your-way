// get activity id
export const getActivityId = () => {
    const savedActivityId = localStorage.getItem('saved_activity')
        ? JSON.parse(localStorage.getItem('saved_activity'))
        : [];

        return savedActivityId;
};

// remove activity
export const saveActivityId = (activityIdArr) => {
    if(activityIdArr.length) {
        localStorage.setItem('saved_activity', JSON.stringify(activityIdArr))
    } else {
        localStorage.removeItem('saved_activity');
    }
};

export const removeActivityId = (activityId) => {
    const savedActivityId = localStorage.getItem('saved_activity')
    ? JSON.parse(localStorage.getItem('saved_activity'))
    : null;

    if(!savedActivityId){
        return false;
    }

    // update activity
    const updateActivityId = savedActivityId?.filter((savedActivityId) => savedActivityId !== activityId);
    localStorage.setItem('saved_activity', JSON.stringify(updateActivityId))

    return true;
};