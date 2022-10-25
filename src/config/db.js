const { Pool } = require('pg');

const pool = new Pool({
  user: 'MSI GF3',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5432,
}) 
module.exports = pool;