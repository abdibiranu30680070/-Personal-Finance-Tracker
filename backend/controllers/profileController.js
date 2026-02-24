const profileService = require('../services/profileService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../middleware/authMiddleware');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await profileService.registerUser(name, email, password);

        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({ user, token });
    } catch (err) {
        // log the error so we can see why registration failed during development
        console.error('Registration error:', err.message);
        // if we know the error is a duplicate email we can use 409
        if (err.message.toLowerCase().includes('email')) {
            return res.status(409).json({ error: err.message });
        }
        res.status(400).json({ error: err.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await profileService.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            user: { id: user.id, name: user.name, email: user.email, profile_picture: user.profile_picture },
            token
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const update = async (req, res) => {
    try {
        const user = await profileService.updateProfile(req.user.id, req.body);
        res.json({
            message: 'Profile updated successfully',
            user: { id: user.id, name: user.name, email: user.email, profile_picture: user.profile_picture }
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    register,
    login,
    update
};
