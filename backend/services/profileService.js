const db = require('../db');
const bcrypt = require('bcryptjs');

const registerUser = async (name, email, password) => {
    // Check if user already exists
    const existing = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
        throw new Error('Email already in use');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const result = await db.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, profile_picture',
        [name, email, hashedPassword]
    );
    return result.rows[0];
};

const findUserByEmail = async (email) => {
    const result = await db.query('SELECT id, name, email, profile_picture, password FROM users WHERE email = $1', [email]);
    return result.rows[0];
};

const updateProfile = async (userId, data) => {
    const { name, email, profile_picture } = data;

    // If email is being changed, check if it's already taken
    if (email) {
        const existing = await db.query('SELECT * FROM users WHERE email = $1 AND id != $2', [email, userId]);
        if (existing.rows.length > 0) {
            throw new Error('Email already in use');
        }
    }

    // Build update query dynamically
    const updates = [];
    const values = [];
    let placeholderIdx = 1;

    if (name) {
        updates.push(`name = $${placeholderIdx++}`);
        values.push(name);
    }
    if (email) {
        updates.push(`email = $${placeholderIdx++}`);
        values.push(email);
    }
    if (profile_picture !== undefined) {
        updates.push(`profile_picture = $${placeholderIdx++}`);
        values.push(profile_picture);
    }

    if (updates.length === 0) {
        throw new Error('No fields to update');
    }

    values.push(userId);
    const query = `UPDATE users SET ${updates.join(', ')} WHERE id = $${placeholderIdx} RETURNING id, name, email, profile_picture`;

    const result = await db.query(query, values);
    return result.rows[0];
};

module.exports = {
    registerUser,
    findUserByEmail,
    updateProfile
};
