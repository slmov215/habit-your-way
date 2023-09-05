// import React, { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { EDIT_ACTIVITY } from '../utils/mutations';

// const EditActivityForm = ({ activity }) => {
//   const [title, setTitle] = useState(activity.title);
//   const [description, setDescription] = useState(activity.description);

//   const [updateActivity] = useMutation(updateActivity);

//   const handleEdit = async () => {
//     try {
//       await updateActivity({
//         variables: {
//           activityId: activity._id,
//           activityInput: {
//             title: title,
//             description: description,
//           },
//         },
//       });
//       // Handle success or refetch data
//     } catch (error) {
//       console.error('Error editing activity:', error);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <textarea
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <button onClick={handleEdit}>Save Changes</button>
//     </div>
//   );
// };

// export default EditActivityForm;
