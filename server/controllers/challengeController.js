const DailyChallenge = require('../models/DailyChallenge');
const ChallengeSubmission = require('../models/ChallengeSubmission');
const User = require('../models/User');

// @desc Get today's learning challenge
// @route GET /api/challenges/today
const getTodayChallenge = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    let challenge = await DailyChallenge.findOne({ dateString: today });

    // Fallback: If no challenge specifically for today, return the latest or first
    if (!challenge) {
      challenge = await DailyChallenge.findOne({}).sort({ createdAt: -1 });
    }

    if (!challenge) {
      return res.status(404).json({ message: 'No challenge available for today' });
    }

    let hasCompleted = false;
    let userPreviousSubmission = null;

    if (req.user) {
      userPreviousSubmission = await ChallengeSubmission.findOne({
        student: req.user._id,
        dateString: challenge.dateString
      });
      if (userPreviousSubmission) {
        hasCompleted = true;
      }
    }

    res.json({
      _id: challenge._id,
      dateString: challenge.dateString,
      title: challenge.title,
      category: challenge.category,
      question: challenge.question,
      options: challenge.options,
      hint: challenge.hint,
      points: challenge.points,
      participantsCount: challenge.participantsCount,
      hasCompleted,
      previousSubmission: userPreviousSubmission ? {
        selectedOption: userPreviousSubmission.selectedOption,
        isCorrect: userPreviousSubmission.isCorrect,
        pointsEarned: userPreviousSubmission.pointsEarned
      } : null,
      explanation: hasCompleted ? challenge.explanation : undefined,
      correctIndex: hasCompleted ? challenge.correctIndex : undefined
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving daily challenge', error: error.message });
  }
};

// @desc Submit answer to daily challenge
// @route POST /api/challenges/submit
const submitChallenge = async (req, res) => {
  try {
    const { challengeId, selectedOption } = req.body;
    const userId = req.user ? req.user._id : null;

    if (!userId) {
      return res.status(401).json({ message: 'Please login to submit challenges and earn streak points' });
    }

    const challenge = await DailyChallenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Check duplicate submission
    const existing = await ChallengeSubmission.findOne({
      student: userId,
      dateString: challenge.dateString
    });

    if (existing) {
      return res.status(400).json({ 
        message: 'You have already submitted today\'s challenge!',
        alreadyCompleted: true,
        submission: existing
      });
    }

    const isCorrect = selectedOption === challenge.correctIndex;
    const pointsAwarded = isCorrect ? challenge.points : 5; // 5 participation points

    const submission = await ChallengeSubmission.create({
      student: userId,
      dateString: challenge.dateString,
      selectedOption,
      isCorrect,
      pointsEarned: pointsAwarded
    });

    // Update challenge participants
    challenge.participantsCount += 1;
    await challenge.save();

    // Update user streak and points
    const user = await User.findById(userId);
    user.points += pointsAwarded;

    // Check streak
    const today = new Date().toISOString().split('T')[0];
    if (user.lastStreakDate !== today) {
      user.streak = (user.streak || 0) + 1;
      user.lastStreakDate = today;

      // Check Consistent Star badge
      if (user.streak >= 3 && !user.badges.some(b => b.id === 'consistent_star')) {
        user.badges.push({
          id: 'consistent_star',
          name: 'Consistent Star',
          icon: 'Flame',
          description: 'Maintained a 3-day active learning streak!',
          unlockedAt: new Date()
        });
      }
    }

    await user.save();

    res.json({
      isCorrect,
      pointsAwarded,
      explanation: challenge.explanation,
      correctIndex: challenge.correctIndex,
      newStreak: user.streak,
      totalPoints: user.points,
      message: isCorrect 
        ? `Spot on! +${pointsAwarded} points added to your profile!` 
        : `Good effort! You earned +${pointsAwarded} participation points.`
    });
  } catch (error) {
    console.error('Challenge submit error:', error);
    res.status(500).json({ message: 'Error recording challenge answer', error: error.message });
  }
};

module.exports = { getTodayChallenge, submitChallenge };
