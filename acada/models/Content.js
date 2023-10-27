const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['lesson', 'quiz', 'assignment'], required: true },
  // Add other content-related fields as needed
});

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
