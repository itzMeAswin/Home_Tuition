const LessonPlan = require('../models/LessonPlan');

// @desc Get all lesson plans (filter by tutor or public templates)
// @route GET /api/lesson-plans
const getLessonPlans = async (req, res) => {
  try {
    let query = {};
    if (req.user && req.user.role === 'tutor') {
      query = { $or: [{ tutor: req.user._id }, { isPublicTemplate: true }] };
    } else {
      query = { isPublicTemplate: true };
    }

    const plans = await LessonPlan.find(query).sort({ createdAt: -1 });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving lesson plans' });
  }
};

// @desc Get lesson plan by ID
// @route GET /api/lesson-plans/:id
const getLessonPlanById = async (req, res) => {
  try {
    const plan = await LessonPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: 'Lesson plan not found' });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lesson plan' });
  }
};

// @desc Create new lesson plan
// @route POST /api/lesson-plans
const createLessonPlan = async (req, res) => {
  try {
    const plan = await LessonPlan.create({
      ...req.body,
      tutor: req.user ? req.user._id : null,
      tutorName: req.user ? req.user.name : 'Educator'
    });
    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Error creating lesson plan', error: error.message });
  }
};

// @desc Update lesson plan
// @route PUT /api/lesson-plans/:id
const updateLessonPlan = async (req, res) => {
  try {
    const plan = await LessonPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!plan) return res.status(404).json({ message: 'Lesson plan not found' });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Error updating lesson plan' });
  }
};

// @desc Delete lesson plan
// @route DELETE /api/lesson-plans/:id
const deleteLessonPlan = async (req, res) => {
  try {
    const plan = await LessonPlan.findByIdAndDelete(req.params.id);
    if (!plan) return res.status(404).json({ message: 'Lesson plan not found' });
    res.json({ message: 'Lesson plan removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting lesson plan' });
  }
};

module.exports = { getLessonPlans, getLessonPlanById, createLessonPlan, updateLessonPlan, deleteLessonPlan };
