const express = require('express');
const router = express.Router();
const { createInquiry, getInquiries, updateInquiry } = require('../controllers/inquiryController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', createInquiry);
router.get('/', protect, authorize('admin'), getInquiries);
router.put('/:id', protect, authorize('admin'), updateInquiry);

module.exports = router;
