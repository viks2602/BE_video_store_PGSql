const pgp = require('pg-promise')();
const connectionOptions = {
  /* Add your PostgreSQL database connection options here */
  host: 'localhost',
  port: 5432,
  database: 'video_app',
  user: 'postgres',
  password: 'V@123',
};

const db = pgp(connectionOptions);

module.exports = db;
