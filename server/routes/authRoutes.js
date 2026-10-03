const express = require('express');
const router = express.Router();
const { register, login, getMe, updateProfile, claimBadge } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.post('/claim-badge', protect, claimBadge);

module.exports = router;
