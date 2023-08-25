import { gql } from '@apollo/client';

export const ADD_ACTIVITY = gql`
  mutation AddActivity($activityInput: ActivityInput!) {
    addActivity(activityInput: $activityInput) {
      _id
      title
      description
      date
      imageUrl
      notes
    }
  }
`;

export const EDIT_ACTIVITY = gql`
  mutation EditActivity($activityId: ID!, $activityInput: ActivityInput!) {
    editActivity(activityId: $activityId, activityInput: $activityInput) {
      _id
      title
      description
      date
      imageUrl
      notes
    }
  }
`;

export const DELETE_ACTIVITY = gql`
  mutation DeleteActivity($activityId: ID!) {
    deleteActivity(activityId: $activityId)
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
      createdAt
    }
  }
`;

export const EDIT_USER = gql`
  mutation EditUser($userId: ID!, $userData: UserInput!) {
    editUserData(userId: $userId, userData: $userData) {
      _id
      username
      email
      createdAt
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logout
  }
`;

export const UPLOAD_IMAGE = gql`
  mutation UploadImage($url: String!) {
    uploadImage(url: $url) {
      _id
      url
    }
  }
`;

// add more mutation functions 
