const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID
    username: String
    email: String
    createdAt: String
    activities: [Activity]
  }

  type Activity {
    _id: ID
    title: String
    description: String
    date: Date
    imageUrl: String
    notes: String
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  input ActivityInput {
    title: String
    description: String
    date: String
    imageUrl: String
    notes: String
  }
  
  input EditActivityInput {
    title: String
    description: String
  }

  input EditUserInput {
    username: String
    email: String
    password: String
  }

  type Image {
    _id: ID!
    url: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
    userByEmail(email: String!): User
    currentUser: User
    searchUsers(username: String!): [User]
    activities: [Activity]
    activity(id: ID!): Activity
    searchActivities(criteria: String!): [Activity]
    deleteActivity(id: ID!): Boolean
    getActivitiesByDate(date: String!): [Activity!]
    getActivitiesByUser: [Activity]
    images: [Image]
  }

  type Mutation {
    addActivity(activityInput: ActivityInput!): Activity
    editActivity(activityId: ID!, newData: EditActivityInput): Activity
    deleteActivity(id: ID!): Boolean
    uploadImage(url: String): Image
    createUser(username: String!, email: String!, password: String!): User!
    editUserData(userId: ID!, newData: EditUserInput): User
    changePassword(userId: ID!, newPassword: String!): Boolean
    login(email: String!, password: String!): AuthData!
    requestPasswordReset(email: String!): Boolean
    resetPassword(token: String!, newPassword: String!): Boolean
  }
`;

module.exports = typeDefs;
