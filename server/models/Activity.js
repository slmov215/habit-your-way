const mongoose = require('mongoose');

// Define the schema for the Activity model
const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  notes: {
    type: String,
  },
});

// Create the Activity model
const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
