const express = require('express');
const router = express.Router();
const { getTrainingModules, getTrainingModule, submitReadinessAssessment } = require('../controllers/trainingController');

router.get('/modules', getTrainingModules);
router.get('/modules/:idOrSlug', getTrainingModule);
router.post('/readiness-assessment', submitReadinessAssessment);

module.exports = router;
