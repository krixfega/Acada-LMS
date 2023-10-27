const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/'; // Replace with your MongoDB connection string

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
