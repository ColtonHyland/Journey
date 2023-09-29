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

    // Import Prisma Client
const { PrismaClient } = require('@prisma/client');

// Create an instance of Prisma Client
const prisma = new PrismaClient();

// Function to create a user
async function createUser(username, email, password) {
  try {
    const user = await prisma.users.create({
      data: {
        username,
        email,
        password,
      },
    });

    console.log('User created:', user);
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  } finally {
    // Disconnect Prisma Client
    await prisma.$disconnect();
  }
}

// Example usage
async function main() {
  const newUser = await createUser('john_doe', 'john@example.com', 'password123');
}

// Call the main function to create the user
main().catch((e) => {
  throw e;
});

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//http://localhost:3001/api/add-user?username=coltonhyland&email=colthyand@gmail.com&password=123