const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    createdAt: String!
    activities: [Activity]!
  }

  type Activity {
    _id: ID!
    title: String!
    description: String
    date: String!
    imageUrl: String
    notes: String
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  input ActivityInput {
    title: String!
    description: String
    date: String!
    imageUrl: String
    notes: String
  }

  type Query {
    activities: [Activity]!
    login(email: String!, password: String!): AuthData!
  }

  type Mutation {
    addActivity(activityInput: ActivityInput!): Activity!
    createUser(username: String!, email: String!, password: String!): User!
  }
`;

module.exports = typeDefs;
