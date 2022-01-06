const { Client } = require("pg");
const dotenv = require("dotenv");

dotenv.config();
const connectionString = process.env.DB_URI;

const client = new Client(connectionString);

client.connect();

module.exports = {
  query: (text, params) => client.query(text, params),
  end: () => client.end(),
};
