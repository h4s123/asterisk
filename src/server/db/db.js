require("dotenv").config({ path: require("path").resolve(__dirname, "../../../.env") });
const { Pool } = require("pg");

// import dotenv from '../../../.env'

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

// const pool = new Pool({
//   host: "localhost",
//   user: "akoma",
//   password: "akoma",
//   database: "mydb",
//   port: 5432,
// });


pool.on("connect", () => {
  console.log("Connected to the database.");
});

pool.on("error", (err) => {
  console.error("Database connection error:", err);
});

module.exports = pool;
