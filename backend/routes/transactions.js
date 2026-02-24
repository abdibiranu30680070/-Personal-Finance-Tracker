const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { transactionValidationRules, validate } = require('../middleware/validationMiddleware');

// Get all transactions for a user
router.get('/', authMiddleware, transactionController.getAll);

// Create transaction
router.post('/', authMiddleware, transactionValidationRules, validate, transactionController.create);

// Update transaction
router.put('/:id', authMiddleware, transactionValidationRules, validate, transactionController.update);

// Delete transaction
router.delete('/:id', authMiddleware, transactionController.remove);

module.exports = router;
