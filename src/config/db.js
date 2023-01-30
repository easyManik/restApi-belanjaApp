const { Pool } = require('pg');
const pool = new Pool({
  //user: process.env.DB_USERNAME,
  //host: process.env.DB_HOST,
  //database: process.env.DB_DATABASE,
  //password: process.env.DB_PASSWORD,
  //port: process.env.DB_PORT,
  DB_URI : process.env.DB_URI,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
});

pool.connect((error, client) => {
  if (error) {
    console.log("there is error: ", error)
  } else {
    console.log("connect database " +client.database + " in "+client.host)
  }
});

module.exports = pool;
