const express = require('express');
const router = express.Router();
const { getQuizzes, getQuizById, submitQuiz, createQuiz } = require('../controllers/quizController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Optional auth on submit (allows guests to test or logged-in students to record)
const optionalAuth = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const jwt = require('jsonwebtoken');
      const User = require('../models/User');
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret_jwt_key_2026_tuition');
      req.user = await User.findById(decoded.id).select('-password');
    } catch (e) {
      // Proceed without user
    }
  }
  next();
};

router.get('/', getQuizzes);
router.get('/:id', getQuizById);
router.post('/:id/submit', optionalAuth, submitQuiz);
router.post('/', protect, authorize('admin', 'tutor'), createQuiz);

module.exports = router;
