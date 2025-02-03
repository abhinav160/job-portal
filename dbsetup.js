const { Client } = require("pg");
require("dotenv").config(); // Load environment variables

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Required for Neon
});

async function setupDatabase() {
    try {
        await client.connect();
        console.log("✅ Connected to PostgreSQL");

        // Create Users table
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        await client.query(createTableQuery);
        console.log("✅ Users table created!");

        client.end();
    } catch (err) {
        console.error("❌ Error setting up database:", err);
    }
}

setupDatabase();
