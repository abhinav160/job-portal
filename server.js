const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();  // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 10000;  // Use dynamic port for Render or 10000 locally

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Database Connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,  // Fetch connection string from .env
    ssl: { rejectUnauthorized: false }  // Required for Neon to avoid SSL errors
});

// Test Database Connection
pool.connect()
    .then(() => console.log("✅ Connected to PostgreSQL (Neon)"))
    .catch(err => console.error("❌ Database Connection Error:", err));

// Default Route
app.get("/", (req, res) => {
    res.send("🚀 Server is running and connected to the database!");
});

// Test Route to Check Database
app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({ message: "✅ Database Connected!", time: result.rows[0] });
    } catch (err) {
        res.status(500).json({ message: "❌ Database Connection Failed", error: err.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
