const express = require('express');
const router = express.Router();
const { getTutors, getTutorById, matchTutors } = require('../controllers/tutorController');

router.get('/', getTutors);
router.post('/match', matchTutors);
router.get('/:id', getTutorById);

module.exports = router;
