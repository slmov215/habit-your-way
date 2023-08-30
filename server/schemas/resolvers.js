const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const { AuthenticationError } = require('apollo-server-express');
const { signToken, AuthenticationError } = require('../utils/auth');
const cloudinary = require('cloudinary').v2;
const Activity = require('../models/Activity');
const User = require('../models/User');
const Image = require('../models/Image');


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
    getActivitiesByDate: async (_, { date }, context) => {
      // Fetch activities from the database based on the provided date
      const activities = await Activity.find({ date: date });
      return activities;
    },
    images: async () => {
      try {
        const images = await Image.find();
        return images;
      } catch (error) {
        throw new Error('Error fetching images');
      }
    },
    // getSensitiveData: async (_, __, context) => {
    //   if (!context.user) {
    //     throw new Error('Authentication required');
    //   }
    //   // Perform action for authenticated users
    //   return 'Sensitive data only visible to authenticated users';
    // },
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
  },
  Mutation: {
    addActivity: async (_, { activityInput }) => {
      try {
        console.log('Received activityInput:', activityInput);
        const currentDate = new Date().toISOString();
        const newActivity = new Activity({
          ...activityInput,
          date: currentDate,
          // imageUrl: result.secure_url,
          user: context.user._id,
        });

        const savedActivity = await newActivity.save();
        return savedActivity;
      } catch (error) {
        console.error('Error adding activity:', error);
        throw new Error('Error adding activity');
      }
    },
    // uploadImage: async (_, { url }) => {
    //   try {
    //     const newImage = new Image({ url });
    //     const savedImage = await newImage.save();
    //     return savedImage;
    //   } catch (error) {
    //     throw new Error('Error uploading image');
    //   }
    uploadImage: async (_, { url }) => {
      try {
        const result = await cloudinary.uploader.upload(url);
        return {
          _id: result.public_id,
          url: result.secure_url,
        };
      } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Error uploading image');
      }
    },
    createUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          'mysecretsshhhhh',
          { expiresIn: '1h' }
        );
        console.log("your token code:" , token)
        return { token, user };
      } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Error creating user');
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
        console.log("your token code:" , token)
        return {
          userId: user._id,
          token,
          tokenExpiration: 1, // Expiration in hours
        };
      } catch (error) {
        throw new Error('Error during login');
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
    
  },
  User: {
    activities: async (parent) => {
      const user = await User.findById(parent._id).populate('activities');
      return user.activities;
    },
  },
};

module.exports = resolvers;
