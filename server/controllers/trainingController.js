const TrainingModule = require('../models/TrainingModule');

// @desc Get all teacher training modules
// @route GET /api/training/modules
const getTrainingModules = async (req, res) => {
  try {
    const modules = await TrainingModule.find({}).sort({ createdAt: 1 });
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving training modules' });
  }
};

// @desc Get training module by slug or ID
// @route GET /api/training/modules/:idOrSlug
const getTrainingModule = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let mod;
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      mod = await TrainingModule.findById(idOrSlug);
    } else {
      mod = await TrainingModule.findOne({ slug: idOrSlug });
    }
    if (!mod) return res.status(404).json({ message: 'Training module not found' });
    res.json(mod);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving training module' });
  }
};

// @desc Evaluate Teaching Readiness Assessment
// @route POST /api/training/readiness-assessment
const submitReadinessAssessment = async (req, res) => {
  try {
    const { answers } = req.body; // Array: [{ category: 'Pedagogy', score: 4 }, ...]
    
    // Calculate category scores
    let totalScore = 0;
    let maxScore = answers.length * 5; // Scale 1 to 5
    const categoryBreakdown = {};

    answers.forEach(a => {
      const cat = a.category || 'General Pedagogy';
      if (!categoryBreakdown[cat]) {
        categoryBreakdown[cat] = { total: 0, count: 0 };
      }
      categoryBreakdown[cat].total += Number(a.score || 3);
      categoryBreakdown[cat].count += 1;
      totalScore += Number(a.score || 3);
    });

    const percentage = Math.round((totalScore / maxScore) * 100);

    const strengths = [];
    const improvementAreas = [];

    Object.keys(categoryBreakdown).forEach(cat => {
      const avg = categoryBreakdown[cat].total / categoryBreakdown[cat].count;
      if (avg >= 4) {
        strengths.push(`${cat} (${Math.round((avg / 5) * 100)}% Proficiency)`);
      } else {
        improvementAreas.push(`${cat} (${Math.round((avg / 5) * 100)}% Proficiency)`);
      }
    });

    // Fetch recommended modules
    const allModules = await TrainingModule.find({});
    const recommended = allModules.slice(0, 3);

    let readinessLevel = 'Developing Educator';
    if (percentage >= 85) readinessLevel = 'Master Pedagogical Facilitator';
    else if (percentage >= 70) readinessLevel = 'Proficient Modern Educator';

    res.json({
      totalScore,
      maxScore,
      percentage,
      readinessLevel,
      strengths: strengths.length > 0 ? strengths : ['Enthusiasm for student growth'],
      improvementAreas: improvementAreas.length > 0 ? improvementAreas : ['Advanced Formative Digital Assessment'],
      recommendedModules: recommended
    });
  } catch (error) {
    res.status(500).json({ message: 'Error grading readiness assessment', error: error.message });
  }
};

module.exports = { getTrainingModules, getTrainingModule, submitReadinessAssessment };
