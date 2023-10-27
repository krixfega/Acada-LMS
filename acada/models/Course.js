const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who created the course
  content: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }],
  // Add other course-related fields as needed
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
