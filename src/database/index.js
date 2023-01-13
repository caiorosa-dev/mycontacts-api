const { Client } = require('pg');

const credentials = {
  host: process.env.PG_HOST || 'localhost',
  port: process.env.PG_PORT || 5432,
  user: process.env.PG_USER || 'root',
  password: process.env.PG_PASSWORD || 'root',
  database: process.env.PG_DATABASE || 'mycontacts',
  ssl: process.env.PG_SSL || false,
};

const client = new Client(credentials);

client.connect();

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);

  return rows;
};
