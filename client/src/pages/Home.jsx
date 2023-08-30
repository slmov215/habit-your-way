import Bar from '../components/Bar.jsx';
import "../styles/Home.css";

export default function Home(){
    return(  
        <div className='home-div'>
            <Bar />
            <div className='activities'> 
                <h2>This week you've completed ___ activities!</h2>
                {/* Completed activities listed here */}
            </div>
        </div>
    )
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