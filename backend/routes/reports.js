const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authMiddleware } = require('../middleware/authMiddleware');

// POST /api/reports/save
router.post('/save', authMiddleware, reportController.save);

module.exports = router;
