const { Pool } = require('pg');
require('dotenv').config();

const poolConfig = process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    }
    : {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    };

async function verify() {
    const pool = new Pool(poolConfig);
    try {
        console.log('--- Database Diagnostic ---');
        console.log('Testing connection...');
        const now = await pool.query('SELECT NOW()');
        console.log('Connection successful! Server time:', now.rows[0].now);

        console.log('Listing tables in public schema...');
        const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);

        if (tables.rows.length === 0) {
            console.log('⚠️ NO TABLES FOUND! You need to run the SQL schema in your Neon console.');
        } else {
            console.log('Tables found:');
            tables.rows.forEach(row => console.log(` - ${row.table_name}`));
        }
        console.log('---------------------------');
    } catch (err) {
        console.error('❌ Connection failed:', err.message);
    } finally {
        await pool.end();
    }
}

verify();
