const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function init() {
    const connectionConfig = {
        user: process.env.DB_USER || 'finance_user',
        host: process.env.DB_HOST || 'localhost',
        database: 'postgres', // Connect to default postgres first
        password: process.env.DB_PASSWORD || 'finance_password',
        port: process.env.DB_PORT || 5432,
    };

    const client = new Client(connectionConfig);

    try {
        await client.connect();
        console.log('Connected to PostgreSQL');

        // Create database if it doesn't exist
        const dbName = process.env.DB_NAME || 'finance_tracker';
        const dbCheck = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);

        if (dbCheck.rows.length === 0) {
            await client.query(`CREATE DATABASE ${dbName}`);
            console.log(`Database ${dbName} created`);
        } else {
            console.log(`Database ${dbName} already exists`);
        }

        await client.end();

        // Connect to the new database to run schema
        const dbClient = new Client({
            ...connectionConfig,
            database: dbName,
        });

        await dbClient.connect();
        console.log(`Connected to ${dbName}`);

        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        await dbClient.query(schema);
        console.log('Schema applied successfully');

        await dbClient.end();
        console.log('Initialization complete');
    } catch (err) {
        console.error('Initialization failed:', err);
        process.exit(1);
    }
}

init();
