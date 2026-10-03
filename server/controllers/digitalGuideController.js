const DigitalGuide = require('../models/DigitalGuide');

// @desc Get all digital guides
// @route GET /api/digital-guides
const getDigitalGuides = async (req, res) => {
  try {
    const { category, audience } = req.query;
    let query = {};
    if (category && category !== 'All') query.category = category;
    if (audience && audience !== 'All') query.targetAudience = { $regex: audience, $options: 'i' };

    const guides = await DigitalGuide.find(query).sort({ createdAt: 1 });
    res.json(guides);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving digital guides' });
  }
};

// @desc Get single digital guide
// @route GET /api/digital-guides/:idOrSlug
const getDigitalGuide = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let guide;
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      guide = await DigitalGuide.findById(idOrSlug);
    } else {
      guide = await DigitalGuide.findOne({ slug: idOrSlug });
    }
    if (!guide) return res.status(404).json({ message: 'Guide not found' });
    res.json(guide);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching digital guide' });
  }
};

// @desc Digital Literacy Readiness Diagnostic
// @route POST /api/digital-guides/readiness-assessment
const submitLiteracyAssessment = async (req, res) => {
  try {
    const { answers } = req.body; // Array: [{ topic: 'Video Tools', score: 2 }, ...]

    let totalScore = 0;
    let maxScore = answers.length * 5;

    answers.forEach(a => {
      totalScore += Number(a.score || 3);
    });

    const percentage = Math.round((totalScore / maxScore) * 100);

    let level = 'Digital Explorer (Needs Guidance)';
    if (percentage >= 80) level = 'Digital Native (Fully Independent)';
    else if (percentage >= 60) level = 'Intermediate User (Comfortable with Basics)';

    const guides = await DigitalGuide.find({});
    
    // Pick beginner guides if score low, or advanced if high
    const recommendedGuides = percentage < 70 
      ? guides.filter(g => g.difficulty === 'Absolute Beginner')
      : guides.slice(0, 3);

    res.json({
      percentage,
      totalScore,
      maxScore,
      level,
      feedback: percentage >= 80 
        ? 'Excellent digital fluency! You are ready for all interactive features.' 
        : 'A little practice with screen sharing and file uploads will make online classes effortless!',
      recommendedGuides: recommendedGuides.length > 0 ? recommendedGuides : guides.slice(0, 3)
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing digital literacy assessment' });
  }
};

module.exports = { getDigitalGuides, getDigitalGuide, submitLiteracyAssessment };
