const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'finance_user',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'finance_tracker',
  password: process.env.DB_PASSWORD || 'finance_password',
  port: process.env.DB_PORT || 5432,
});

module.exports = {
  query: async (text, params) => {
    try {
      return await pool.query(text, params);
    } catch (err) {
      console.error('Database Query Error:', err);
      throw err;
    }
  },
};
