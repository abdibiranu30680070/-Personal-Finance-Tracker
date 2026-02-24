const { Pool } = require('pg');

const config = { user: 'postgres', password: 'abdii12334', host: '127.0.0.1', database: 'finance_tracker', port: 5432 };

async function main() {
    const pool = new Pool(config);
    try {
        const client = await pool.connect();
        console.log('Connected to finance_tracker database successfully!');

        console.log("Granting public schema permissions to finance_user...");
        await client.query('GRANT ALL ON SCHEMA public TO finance_user');
        await client.query('GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO finance_user');
        await client.query('GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO finance_user');
        console.log("Permissions granted.");

        client.release();
    } catch (err) {
        console.error('Operation failed:', err);
    } finally {
        await pool.end();
    }
}

main();
