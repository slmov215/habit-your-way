const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const { AuthenticationError } = require('apollo-server-express');
const { signToken, AuthenticationError } = require('../utils/auth');
const cloudinary = require('cloudinary').v2;
const Activity = require('../models/Activity');
const User = require('../models/User');
const Image = require('../models/Image');
const Goal = require('../models/Goal')


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
    activity: async (_, { id }) => {
      try {
        const activity = await Activity.findById(id);
        return activity;
      } catch (error) {
        throw new Error('Error fetching activity');
      }
    },
    getActivitiesByDate: async (_, { date }, context) => {
      console.log("Resolver Date Input:", date);

      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      
      // Fetch activities within the date range
      const activities = await Activity.find({
        date: { $gte: startDate, $lte: endDate },
      });
      console.log("Activities Retrieved:", activities);
      return activities;
    },
    searchActivities: async (_, { criteria }) => {
      try {
        const activities = await Activity.find({ title: { $regex: criteria, $options: 'i' } });
        return activities;
      } catch (error) {
        throw new Error('Error searching activities');
      }
    },
    user: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (error) {
        throw new Error('Error fetching user');
      }
    },
    currentUser: async (_, __, context) => {
      if (!context.user) {
        return null; // Return null if not authenticated
      }

      try {
        const user = await User.findById(context.user._id);
        return user;
      } catch (error) {
        throw new Error('Error fetching current user');
      }
    },
    images: async () => {
      try {
        const images = await Image.find();
        return images;
      } catch (error) {
        throw new Error('Error fetching images');
      }
    },
    // getActivitiesByUser: async (_, args, context) => {
    //   // Check if the user is authenticated
    //   // console.log('User data from context:', context.user); 
    //   if (!context.user) {
    //     throw new Error('Authentication required');
    //   }

    //   try {
    //     // Fetch activities for the authenticated user
    //     const activities = await Activity.find({ user: context.user._id });
    //     return activities;
    //   } catch (error) {
    //     throw new Error('Error fetching activities');
    //   }
    // },
    goals: async (_, { userId }) => {
      // Fetch goals for a specific user
      return Goal.find({ user: userId });
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          'mysecretsshhhhh',
          { expiresIn: '1h' }
        );
        console.log("your token code:", token)
        return { token, user };
      } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Error creating user');
      }
    },
    addActivity: async (_, { activityInput }) => {
      try {
        console.log('Received activityInput:', activityInput);

        // Extract imageUrls from activityInput
        const { imageUrls, ...activityData } = activityInput;

        // Create the activity without images
        const newActivity = await Activity.create(activityData);

        // If imageUrls are provided, associate them with the activity
        if (imageUrls && imageUrls.length > 0) {
          // You might want to adjust the following part based on how your schema is designed
          await Activity.findByIdAndUpdate(newActivity._id, { $set: { imageUrls } });
        }

        return newActivity;
      } catch (error) {
        console.error('Error adding activity:', error);
        throw new Error('Error adding activity');
      }
    },
    deleteActivity: async (_, { id }) => {
      try {
        await Activity.findByIdAndDelete(id);
        return true;
      } catch (error) {
        throw new Error('Error deleting activity');
      }
    },
    uploadImage: async (_, { url }) => {
      try {
        console.log('Received URL:', url);
        const image = await Image.create({ url });
        return image;
      } catch (error) {
        console.error('Error creating image:', error);
        throw new Error('Error creating image');
      }
    },
    editUserData: async (_, { userId, newData }) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(userId, newData, { new: true });
        return updatedUser;
      } catch (error) {
        throw new Error('Error editing user data');
      }
    },
    // editUserData: async (_, args, context) => {
    //   if (!context.user) {
    //     throw new Error('Authentication required');
    //   }
    //   if (context.user._id !== args.userId) {
    //     throw new Error('Unauthorized');
    //   }
    //   // Perform action for authorized user
    // },
    login: async (_, args) => {
      const { email, password } = args;

      try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('User not found');
        }
        console.log(user)
        // Compare the provided password with the stored password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new AuthenticationError('Invalid password');
        }

        // Generate JWT token
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          'mysecretsshhhhh',
          { expiresIn: '1h' }
        );
        console.log("your token code:", token)
        return {
          userId: user._id,
          token,
          tokenExpiration: 1, // Expiration in hours
        };
      } catch (error) {
        throw new Error('Error during login');
      }
    },
    changePassword: async (_, { userId, newPassword }) => {
      try {
        const user = await User.findById(userId);
        user.password = newPassword;
        await user.save();
        return true;
      } catch (error) {
        throw new Error('Error changing password');
      }
    },
    editActivity: async (_, { activityId, newData }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }

      try {
        // Find the activity by ID
        const activity = await Activity.findById(activityId);
        if (!activity) {
          throw new Error('Activity not found');
        }

        // Check if the activity belongs to the authenticated user
        if (activity.user.toString() !== context.user._id) {
          throw new AuthenticationError('Unauthorized');
        }

        // Update the activity data
        activity.title = newData.title;
        activity.description = newData.description;

        // Save the changes
        const updatedActivity = await activity.save();
        return updatedActivity;
      } catch (error) {
        console.error('Error editing activity:', error);
        throw new Error('Error editing activity');
      }
    },
    createGoal: async (_, { goalInput }) => {
      try {
        // Check if the required fields (activity and user) are provided in goalInput
        if (!goalInput.activity || !goalInput.user) {
          throw new Error("Both activity and user fields are required.");
        }
    
        // Create a new goal instance with the provided input
        const newGoal = new Goal(goalInput);
    
        // Save the new goal to the database
        await newGoal.save();
    
        // Return the saved goal
        return newGoal;
      } catch (error) {
        // Handle and log the error
        console.error("Error saving goal:", error);
        throw error;
      }
    },
    
    updateGoal: async (_, { goalId, goalInput }) => {
      // Update an existing goal
      return Goal.findByIdAndUpdate(goalId, goalInput, { new: true });
    },
    deleteGoal: async (_, { goalId }) => {
      // Delete a goal and return the deleted goal
      return Goal.findByIdAndRemove(goalId);
    },

  },
  User: {
    activities: async (parent) => {
      const user = await User.findById(parent._id).populate('activities');
      return user.activities;
    },
  },
};

module.exports = resolvers;
