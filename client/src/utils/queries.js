import { gql } from '@apollo/client';

export const GET_ACTIVITIES = gql`
  query GetActivities {
    activities {
      _id
      title
      description
      date
      imageUrl
      notes
    }
  }
`;

export const GET_ACTIVITIES_BY_DATE = gql`
  query GetActivitiesByDate($date: String!) {
    getActivitiesByDate(date: $date) {
      _id
      title
      description
      date
    }
  }
`;

// export const GET_IMAGES = gql`
//   query GetImages {
//     images {
//       _id
//       url
//     }
//   }
// `;

// export const UPLOAD_IMAGE = gql`
//   mutation UploadImage($url: String) {
//     uploadImage(url: $url)  
//   }
// `;

// export const LOGIN_USER = gql`
//   mutation LoginUser($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       userId
//       token
//       tokenExpiration
//     }
//   }
// `;

// add more queries and mutations 
