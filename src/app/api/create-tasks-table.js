import { sql } from '@vercel/postgres';

export default async function createTasksTable(req, res) {
  try {
    await sql`
      CREATE TABLE tasks (
        task_id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        task_type VARCHAR(20) NOT NULL,
        title VARCHAR(100) NOT NULL,
        description TEXT,
        due_date DATE,
        status VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        timeframe_id INT,
        journal_entry TEXT,
        FOREIGN KEY (user_id) REFERENCES users (user_id),
        FOREIGN KEY (timeframe_id) REFERENCES timeframes (timeframe_id)
      );
    `;
    return res.json({ message: 'Tasks table created successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while creating the Tasks table.' });
  }
}
