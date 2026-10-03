const express = require('express');
const router = express.Router();
const { getDigitalGuides, getDigitalGuide, submitLiteracyAssessment } = require('../controllers/digitalGuideController');

router.get('/', getDigitalGuides);
router.get('/:idOrSlug', getDigitalGuide);
router.post('/readiness-assessment', submitLiteracyAssessment);

module.exports = router;
