const Content = require('../models/Content');

// Create content associated with a course
const createContent = async (req, res) => {
  try {
    const { title, type } = req.body;
    const courseId = req.params.courseId; 

    // Check if the user has permission to create content for this course (authorization logic here)

    const content = new Content({ title, type });
    content.course = courseId;
    await content.save();

    res.status(201).json({ message: 'Content created successfully', content });
  } catch (error) {
    res.status(500).json({ message: 'Error creating content', error: error.message });
  }
};

// Update content by ID
const updateContent = async (req, res) => {
  try {
    const { title, type } = req.body;
    const contentId = req.params.contentId;

    // Check if the user has permission to update this content (authorization logic here)

    const content = await Content.findByIdAndUpdate(contentId, { title, type }, { new: true });

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.status(200).json({ message: 'Content updated successfully', content });
  } catch (error) {
    res.status(500).json({ message: 'Error updating content', error: error.message });
  }
};

// Delete content by ID
const deleteContent = async (req, res) => {
  try {
    const contentId = req.params.contentId;

    // Check if the user has permission to delete this content (authorization logic here)

    const content = await Content.findByIdAndRemove(contentId);

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.status(200).json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting content', error: error.message });
  }
};

module.exports = {
  createContent,
  updateContent,
  deleteContent,
};
