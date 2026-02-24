const express = require('express');
const router = express.Router();
const summaryController = require('../controllers/summaryController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', authMiddleware, summaryController.getSummary);

module.exports = router;
