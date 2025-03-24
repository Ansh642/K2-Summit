const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: {
    rejectUnauthorized: false // Required for Neon's SSL
  },
  connectionTimeoutMillis: 5000, // Optional: Set timeout
  idleTimeoutMillis: 30000 // Optional: Set idle timeout
});

pool.connect()
  .then(() => console.log("✅ PostgreSQL Connected to Neon!"))
  .catch(err => console.error("❌ PostgreSQL connection error", err.stack)); // Added stack trace

module.exports = pool;