const { createPool } = require('mysql2/promise');
const {db} = require('./config');

const pool = createPool({
  host: db.host,
  port: db.port,
  user: db.user,
  password: db.password,
  database: db.db_name,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;