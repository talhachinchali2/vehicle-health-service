const db = require('./db'); // Adjust the path based on your project structure

const createDtcTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS dtc (
      id SERIAL PRIMARY KEY,
      code VARCHAR(10) NOT NULL,
      description VARCHAR(255),
      is_manufacturer_defined BOOLEAN,
      is_sae_defined BOOLEAN,
      severity_level INTEGER,
      subsystem VARCHAR(255),
      system VARCHAR(255),
      causes TEXT[],
      symptoms TEXT[],
      tags TEXT[],
      uuid VARCHAR(36),
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    const result = await db.query(createTableQuery);
    console.log('DTC table created successfully');
  } catch (error) {
    console.error('Error creating DTC table:', error);
  }
};

createDtcTable();
