const { Pool } = require('pg');
require('dotenv').config();


// Replace the following values with your PostgreSQL database credentials
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Simple query function to execute SQL queries
const query = async (sql, params) => {

  const client = await pool.connect();
  try {
    const result = await client.query(sql, params);
    return result;
  } finally {
    client.release();
  }
};

module.exports = {
  query,
};
