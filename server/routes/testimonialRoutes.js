const express = require('express');
const router = express.Router();
const { getTestimonials, createTestimonial } = require('../controllers/testimonialController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getTestimonials);
router.post('/', protect, authorize('admin'), createTestimonial);

module.exports = router;
