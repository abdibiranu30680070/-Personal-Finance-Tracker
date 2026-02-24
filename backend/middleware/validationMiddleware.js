const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    });
};

const transactionValidationRules = [
    body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be positive'),
    body('type').isIn(['income', 'expense']).withMessage('Type must be income or expense'),
    body('category').notEmpty().withMessage('Category is required').trim().escape(),
    body('description').optional().trim().escape(),
    body('date').optional().isISO8601().withMessage('Invalid date format'),
];

const profileValidationRules = [
    body('name').notEmpty().withMessage('Name is required').isLength({ min: 3 }).withMessage('Name must be at least 3 characters').trim(),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const loginValidationRules = [
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
];

const updateProfileValidationRules = [
    body('name').optional().isLength({ min: 3 }).withMessage('Name must be at least 3 characters').trim(),
    body('email').optional().isEmail().withMessage('Invalid email format').normalizeEmail(),
    body('profile_picture').optional().isString().withMessage('Profile picture must be a string'),
];

module.exports = {
    validate,
    transactionValidationRules,
    profileValidationRules,
    loginValidationRules,
    updateProfileValidationRules,
};
