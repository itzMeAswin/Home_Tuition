const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');
const User = require('../models/User');

// @desc Get quizzes with subject/grade filter
// @route GET /api/quizzes
const getQuizzes = async (req, res) => {
  try {
    const { subject, grade } = req.query;
    let query = { isActive: true };

    if (subject && subject !== 'All') {
      query.subject = { $regex: subject, $options: 'i' };
    }
    if (grade && grade !== 'All') {
      query.grade = { $regex: grade, $options: 'i' };
    }

    const quizzes = await Quiz.find(query).select('-questions.correctIndex -questions.explanation');
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving quizzes', error: error.message });
  }
};

// @desc Get single quiz with full questions (for playing)
// @route GET /api/quizzes/:id
const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Hide answers from raw question list for honest client side evaluation
    const safeQuestions = quiz.questions.map((q, idx) => ({
      _id: q._id,
      index: idx,
      questionText: q.questionText,
      options: q.options,
      topic: q.topic
    }));

    res.json({
      _id: quiz._id,
      title: quiz.title,
      subject: quiz.subject,
      grade: quiz.grade,
      timeLimitMinutes: quiz.timeLimitMinutes,
      pointsAwarded: quiz.pointsAwarded,
      totalQuestions: quiz.questions.length,
      questions: safeQuestions
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving quiz' });
  }
};

// @desc Submit quiz answers, calculate score, provide topic analysis & award points
// @route POST /api/quizzes/:id/submit
const submitQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const { userAnswers } = req.body; // Array: [{ index: 0, selectedOption: 2 }, ...]
    const userId = req.user ? req.user._id : req.body.studentId;

    let correctCount = 0;
    let incorrectCount = 0;
    const topicStats = {};
    const detailedAnswers = [];

    quiz.questions.forEach((q, idx) => {
      const submitted = userAnswers && userAnswers.find(a => a.index === idx);
      const selected = submitted ? submitted.selectedOption : -1;
      const isCorrect = selected === q.correctIndex;

      if (isCorrect) correctCount++;
      else incorrectCount++;

      // Topic grouping
      const topicName = q.topic || 'General';
      if (!topicStats[topicName]) {
        topicStats[topicName] = { total: 0, correct: 0 };
      }
      topicStats[topicName].total++;
      if (isCorrect) topicStats[topicName].correct++;

      detailedAnswers.push({
        questionIndex: idx,
        questionText: q.questionText,
        options: q.options,
        selectedOption: selected,
        correctOption: q.correctIndex,
        isCorrect,
        explanation: q.explanation,
        topic: topicName
      });
    });

    const totalQuestions = quiz.questions.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const pointsEarned = Math.round((percentage / 100) * quiz.pointsAwarded);

    // Topic Performance Breakdown
    const topicPerformance = Object.keys(topicStats).map(t => {
      const item = topicStats[t];
      const p = Math.round((item.correct / item.total) * 100);
      let status = 'Needs Review';
      if (p === 100) status = 'Mastered';
      else if (p >= 60) status = 'Good';

      return {
        topic: t,
        total: item.total,
        correct: item.correct,
        percentage: p,
        status
      };
    });

    const recommendedTopics = topicPerformance
      .filter(t => t.status === 'Needs Review')
      .map(t => t.topic);

    let savedResult = null;
    let badgeAwarded = null;

    if (userId) {
      // Save QuizResult
      savedResult = await QuizResult.create({
        student: userId,
        quiz: quiz._id,
        quizTitle: quiz.title,
        subject: quiz.subject,
        score: correctCount,
        totalQuestions,
        correctCount,
        incorrectCount,
        percentage,
        pointsEarned,
        answers: detailedAnswers,
        topicPerformance
      });

      // Update student points and check badge
      const user = await User.findById(userId);
      if (user) {
        user.points += pointsEarned;

        // Check if Quiz Champion badge can be awarded
        const hasQuizBadge = user.badges.some(b => b.id === 'quiz_champion');
        if (percentage >= 80 && !hasQuizBadge) {
          user.badges.push({
            id: 'quiz_champion',
            name: 'Quiz Champion',
            icon: 'Trophy',
            description: 'Scored 80%+ in an academic quiz evaluation!',
            unlockedAt: new Date()
          });
          badgeAwarded = 'Quiz Champion';
        }

        // Check Quick Learner badge
        const hasQuickLearner = user.badges.some(b => b.id === 'quick_learner');
        if (!hasQuickLearner) {
          user.badges.push({
            id: 'quick_learner',
            name: 'Quick Learner',
            icon: 'Zap',
            description: 'Completed your first knowledge verification quiz!',
            unlockedAt: new Date()
          });
          if (!badgeAwarded) badgeAwarded = 'Quick Learner';
        }

        await user.save();
      }
    }

    res.json({
      quizTitle: quiz.title,
      subject: quiz.subject,
      score: correctCount,
      totalQuestions,
      correctCount,
      incorrectCount,
      percentage,
      pointsEarned,
      topicPerformance,
      recommendedTopics: recommendedTopics.length > 0 ? recommendedTopics : ['Keep up the phenomenal mastery!'],
      detailedAnswers,
      badgeAwarded,
      resultId: savedResult ? savedResult._id : null
    });
  } catch (error) {
    console.error('Quiz submission error:', error);
    res.status(500).json({ message: 'Error grading quiz', error: error.message });
  }
};

// @desc Create quiz (Tutor/Admin)
// @route POST /api/quizzes
const createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Error creating quiz', error: error.message });
  }
};

module.exports = { getQuizzes, getQuizById, submitQuiz, createQuiz };
