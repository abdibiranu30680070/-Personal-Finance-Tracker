const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'finance_user',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'finance_tracker',
    password: process.env.DB_PASSWORD || 'finance_password',
    port: process.env.DB_PORT || 5432,
});

async function resetPassword() {
    const email = 'abdib6103@gmail.com';
    const password = '12345678';

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await pool.query(
            'UPDATE users SET password = $1 WHERE email = $2 RETURNING id',
            [hashedPassword, email]
        );

        if (result.rows.length > 0) {
            console.log(`Password reset successful for ${email}`);
        } else {
            console.log(`User ${email} not found`);
        }
    } catch (err) {
        console.error('Error resetting password:', err);
    } finally {
        await pool.end();
    }
}

resetPassword();
