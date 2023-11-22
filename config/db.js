const pgp = require('pg-promise')();

const connection = {
  host: process.env.DB_HOST || '',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  ssl: { rejectUnauthorized: false }, // Required for connecting to RDS over SSL
};

const db = pgp(connection);

module.exports = db;
