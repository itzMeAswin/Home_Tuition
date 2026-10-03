const express = require('express');
const router = express.Router();
const { getCourses, getCourse, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getCourses);
router.get('/:idOrSlug', getCourse);
router.post('/', protect, authorize('admin', 'tutor'), createCourse);
router.put('/:id', protect, authorize('admin', 'tutor'), updateCourse);
router.delete('/:id', protect, authorize('admin'), deleteCourse);

module.exports = router;
