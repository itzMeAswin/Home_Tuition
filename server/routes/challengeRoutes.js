const express = require('express');
const router = express.Router();
const { getTodayChallenge, submitChallenge } = require('../controllers/challengeController');
const { protect } = require('../middleware/authMiddleware');

const optionalAuth = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const jwt = require('jsonwebtoken');
      const User = require('../models/User');
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret_jwt_key_2026_tuition');
      req.user = await User.findById(decoded.id).select('-password');
    } catch (e) {
      // Proceed
    }
  }
  next();
};

router.get('/today', optionalAuth, getTodayChallenge);
router.post('/submit', protect, submitChallenge);

module.exports = router;
