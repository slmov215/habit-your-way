const { User, Activity } = require('../models');

const clearCollections = async () => {
  try {
    // Clear the users collection
    await User.deleteMany({});

    // Clear the activities collection
    await Activity.deleteMany({});

    console.log('Collections cleared successfully');
  } catch (error) {
    console.error('Error clearing collections:', error);
  }
};

module.exports = clearCollections;
