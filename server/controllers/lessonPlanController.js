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
    let { title, topic, activities, assessmentMethod, assessmentTechnique } = req.body;
    
    // Normalize fields
    title = title || topic || 'Custom Lesson Plan';
    topic = topic || title;
    assessmentMethod = assessmentMethod || assessmentTechnique || 'Exit Ticket Quiz';

    let normalizedActivities = [];
    if (Array.isArray(activities)) {
      normalizedActivities = activities.map(a => {
        if (typeof a === 'string') return { time: 'Session', title: a, description: '' };
        return a;
      });
    } else if (typeof activities === 'string' && activities.trim()) {
      normalizedActivities = [{ time: '0 - 60 mins', title: 'Core Lesson Flow', description: activities }];
    } else {
      normalizedActivities = [
        { time: '0 - 10 mins', title: 'Concept Hook', description: 'Introduce core problem' },
        { time: '10 - 35 mins', title: 'Guided Practice', description: 'Step-by-step problem dissection' },
        { time: '35 - 50 mins', title: 'Independent Application', description: 'Student hands-on exercise' },
        { time: '50 - 60 mins', title: 'Exit Ticket', description: 'Formative diagnostic evaluation' }
      ];
    }

    const plan = await LessonPlan.create({
      ...req.body,
      title,
      topic,
      assessmentMethod,
      activities: normalizedActivities,
      tutor: req.user ? req.user._id : null,
      tutorName: req.user ? req.user.name : (req.body.tutorName || 'Educator'),
      isPublicTemplate: true
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
