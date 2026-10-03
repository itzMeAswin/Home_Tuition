const express = require('express');
const router = express.Router();
const { createBooking, getBookings, updateBooking, deleteBooking } = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', createBooking);
router.get('/', protect, authorize('admin', 'tutor'), getBookings);
router.put('/:id', protect, authorize('admin', 'tutor'), updateBooking);
router.delete('/:id', protect, authorize('admin'), deleteBooking);

module.exports = router;
