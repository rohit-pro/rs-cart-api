import {Pool} from 'pg';

const pool = new Pool({
    host: `${process.env.DB_HOST}`,
    port: +`${process.env.DB_PORT}`,
    user: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
    ssl: {
      rejectUnauthorized: false,
    }
});

export const sendQuery = async (query: string) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(query);
    client.release();
    return result.rows;
  } catch (err) {
    if (client) {
      client.release();
    }
    throw err;
  }
}