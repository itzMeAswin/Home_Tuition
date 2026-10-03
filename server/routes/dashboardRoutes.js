const express = require('express');
const router = express.Router();
const { getStudentDashboard, getParentDashboard, getTutorDashboard, getAdminDashboard } = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/authMiddleware');

const optionalAuth = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const jwt = require('jsonwebtoken');
      const User = require('../models/User');
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret_jwt_key_2026_tuition');
      req.user = await User.findById(decoded.id).select('-password');
    } catch (e) {}
  }
  next();
};

router.get('/student', optionalAuth, getStudentDashboard);
router.get('/parent', optionalAuth, getParentDashboard);
router.get('/tutor', optionalAuth, getTutorDashboard);
router.get('/admin', optionalAuth, getAdminDashboard);

module.exports = router;
