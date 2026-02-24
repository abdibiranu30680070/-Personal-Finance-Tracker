const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'finance_user',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'finance_tracker',
    password: process.env.DB_PASSWORD || 'finance_password',
    port: process.env.DB_PORT || 5432,
});

const bcrypt = require('bcryptjs');

const testUsers = [
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
    { name: 'Charlie', email: 'charlie@example.com' }
];

const categories = {
    income: ['Salary', 'Freelance', 'Investments', 'Gift'],
    expense: ['Food', 'Rent', 'Transport', 'Utilities', 'Entertainment', 'Shopping']
};

async function seed() {
    try {
        console.log('Starting seeding...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        for (const user of testUsers) {
            console.log(`Seeding data for user: ${user.name}`);

            // Create user with name, email and password
            const userRes = await pool.query(
                'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password RETURNING id',
                [user.name, user.email, hashedPassword]
            );
            const userId = userRes.rows[0].id;

            // Delete existing transactions for this user for a clean seed
            await pool.query('DELETE FROM transactions WHERE user_id = $1', [userId]);

            // Add some transactions for the last 30 days
            const transactions = [];
            for (let i = 0; i < 50; i++) {
                const type = Math.random() > 0.3 ? 'expense' : 'income';
                const categoryList = categories[type];
                const category = categoryList[Math.floor(Math.random() * categoryList.length)];
                const amount = type === 'income'
                    ? (Math.random() * 5000 + 1000).toFixed(2)
                    : (Math.random() * 200 + 10).toFixed(2);

                const date = new Date();
                date.setDate(date.getDate() - Math.floor(Math.random() * 30));

                transactions.push([
                    userId,
                    amount,
                    type,
                    category,
                    `${category} transaction`,
                    date
                ]);
            }

            for (const t of transactions) {
                await pool.query(
                    'INSERT INTO transactions (user_id, amount, type, category, description, date) VALUES ($1, $2, $3, $4, $5, $6)',
                    t
                );
            }
        }

        console.log('Seeding completed successfully');
        process.exit(0);
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
}

seed();
