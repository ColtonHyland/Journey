import { sql } from '@vercel/postgres';

export default async function createCalendarEventsTable(req, res) {
  try {
    await sql`
      CREATE TABLE calendar_events (
        event_id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(100) NOT NULL,
        description TEXT,
        event_datetime TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (user_id)
      );
    `;
    return res.json({ message: 'Calendar Events table created successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while creating the Calendar Events table.' });
  }
}