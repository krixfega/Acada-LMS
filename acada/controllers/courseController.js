const Course = require('../models/Course');
const { validationResult } = require('express-validator');

// Create a new course
const createCourse = async (req, res) => {
  // Input validation using express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description } = req.body;
    const instructor = req.user; // Assuming user data is stored in req.user after authentication

    const course = new Course({ title, description, instructor });
    await course.save();

    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Error creating a course', error: error.message });
  }
};

// Get a course by ID
const getCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate('instructor', 'username');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving the course', error: error.message });
  }
};

// Update a course by ID
const updateCourse = async (req, res) => {
  // Input validation using express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { courseId } = req.params;
    const { title, description } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if the user is the course instructor
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this course' });
    }

    course.title = title;
    course.description = description;
    await course.save();

    res.status(200).json({ message: 'Course updated successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Error updating the course', error: error.message });
  }
};

// Delete a course by ID
const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if the user is the course instructor
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this course' });
    }

    await course.remove();

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the course', error: error.message });
  }
};

// List all courses
const listCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'username');
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error listing courses', error: error.message });
  }
};

// Search for courses
const searchCourses = async (req, res) => {
  try {
    const { keyword } = req.query;
    const courses = await Course.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' }},
        { description: { $regex: keyword, $options: 'i' }},
      ],
    }).populate('instructor', 'username');

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error searching for courses', error: error.message });
  }
};

module.exports = {
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
  listCourses,
  searchCourses,
};
