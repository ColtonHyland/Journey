import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const email = searchParams.get('email');
  const password = searchParams.get('password');

  try {
    if (!username || !email || !password) {
      throw new Error('Username, email, and password are required');
    }

    // Insert a new user into the "users" table
    await sql`
      INSERT INTO users (username, email, password)
      VALUES (${username}, ${email}, ${password});
    `;

    // Fetch all users from the "users" table after insertion
    const users = await sql`SELECT * FROM users;`;
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}