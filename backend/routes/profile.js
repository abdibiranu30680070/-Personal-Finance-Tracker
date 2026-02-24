const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { profileValidationRules, loginValidationRules, updateProfileValidationRules, validate } = require('../middleware/validationMiddleware');

// Register
router.post('/register', (req, res, next) => {
    console.log('Incoming Register Request:', req.body);
    next();
}, profileValidationRules, validate, profileController.register);

// Login
router.post('/login', loginValidationRules, validate, profileController.login);

// Update Profile
router.put('/update', authMiddleware, updateProfileValidationRules, validate, profileController.update);

module.exports = router;
