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

export const GET_ACTIVITIES_BY_USER = gql`
  query GetActivitiesByUser {
    getActivitiesByUser {
      _id
      title
      description
    }
  }
`;

export const GET_IMAGES = gql`
  query GetImages {
    images {
      _id
      url
      activityId
    }
  }
`;

export const GET_GOALS = gql`
  query GetGoals($userId: ID!) {
    goals(userId: $userId) {
      _id
      name
      description
      dueDate
      completed
    }
    activities {
      _id
      title
    }
  }
`;
