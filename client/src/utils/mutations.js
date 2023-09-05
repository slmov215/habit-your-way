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

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
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

export const GET_IMAGES = gql`
  query GetImages {
    images {
      _id
      url
    }
  }
`;

export const CREATE_GOAL = gql`
  mutation CreateGoal($goalInput: GoalInput!) {
    createGoal(goalInput: $goalInput) {
      _id
      name
      description
      dueDate
      completed
    }
  }
`;
// add more mutation functions 
