import { sql } from '@vercel/postgres';

export default async function createUsersTable(req, res) {
  try {
    await sql`
      CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    return res.json({ message: 'Users table created successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while creating the Users table.' });
  }
}