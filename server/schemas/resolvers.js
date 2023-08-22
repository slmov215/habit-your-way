const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const Activity = require('../models/Activity');
const User = require('../models/User');

const resolvers = {
  Query: {
    activities: async () => {
      try {
        const activities = await Activity.find();
        return activities;
      } catch (error) {
        throw new Error('Error fetching activities');
      }
    },
    getSensitiveData: async (_, __, context) => {
      if (!context.user) {
        throw new Error('Authentication required');
      }
      // Perform action for authenticated users
      return 'Sensitive data only visible to authenticated users';
    },
  },
  Mutation: {
    addActivity: async (_, args) => {
      const { activityInput } = args;

      try {
        const newActivity = new Activity({
          ...activityInput,
        });

        const savedActivity = await newActivity.save();
        return savedActivity;
      } catch (error) {
        throw new Error('Error adding activity');
      }
    },
    createUser: async (_, args) => {
      const { username, email, password } = args;

      try {
        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('User with this email already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user
        const newUser = new User({
          username,
          email,
          password: hashedPassword,
        });

        const savedUser = await newUser.save();
        return savedUser;
      } catch (error) {
        throw new Error('Error creating user');
      }
    },
    editUserData: async (_, args, context) => {
      if (!context.user) {
        throw new Error('Authentication required');
      }
      if (context.user._id !== args.userId) {
        throw new Error('Unauthorized');
      }
      // Perform action for authorized user
    },
    login: async (_, args) => {
      const { email, password } = args;

      try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('User not found');
        }

        // Compare the provided password with the stored password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new AuthenticationError('Invalid password');
        }

        // Generate JWT token
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          'your-secret-key',
          { expiresIn: '1h' }
        );

        return {
          userId: user._id,
          token,
          tokenExpiration: 1, // Expiration in hours
        };
      } catch (error) {
        throw new Error('Error during login');
      }
    },
  },
};

module.exports = resolvers;
