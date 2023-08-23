const db = require('./connection');
const { Activity, User } = require('../models')
const cleanDB = require('./cleanDB');

const activityData = require('./activityData.json')
const userData = require('./userData.json')

const seedDatabase = async () => {
  try {
    // Clean the database before seeding (if needed)
    await cleanDB();

    // Seed User data
    const users = await User.create(userData);

    // Modify the activity data to associate each activity with a user
    const activitiesWithUser = activityData.map(activity => ({
      ...activity,
      user: users[Math.floor(Math.random() * users.length)]._id,
    }));

    // Seed Activity data
    await Activity.create(activitiesWithUser);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the database connection
    db.close();
  }
};

seedDatabase();
