const Course = require('../models/Course');

// @desc Get all courses with filtering & search
// @route GET /api/courses
const getCourses = async (req, res) => {
  try {
    const { subject, grade, curriculum, mode, search } = req.query;
    let query = {};

    if (subject && subject !== 'All') {
      query.subject = { $regex: subject, $options: 'i' };
    }
    if (grade && grade !== 'All') {
      query.grades = { $in: [new RegExp(grade, 'i')] };
    }
    if (curriculum && curriculum !== 'All') {
      query.curriculum = { $in: [new RegExp(curriculum, 'i')] };
    }
    if (mode && mode !== 'All') {
      query.mode = mode;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } }
      ];
    }

    const courses = await Course.find(query).sort({ isFeatured: -1, createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving courses', error: error.message });
  }
};

// @desc Get single course by ID or Slug
// @route GET /api/courses/:idOrSlug
const getCourse = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let course;
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      course = await Course.findById(idOrSlug);
    } else {
      course = await Course.findOne({ slug: idOrSlug });
    }

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving course details' });
  }
};

// @desc Create new course
// @route POST /api/courses
const createCourse = async (req, res) => {
  try {
    const { title, subject, grades, curriculum, mode, description, highlights, syllabus } = req.body;
    const slug = req.body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const course = await Course.create({
      ...req.body,
      slug
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error creating course', error: error.message });
  }
};

// @desc Update course
// @route PUT /api/courses/:id
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error updating course' });
  }
};

// @desc Delete course
// @route DELETE /api/courses/:id
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course' });
  }
};

module.exports = { getCourses, getCourse, createCourse, updateCourse, deleteCourse };
