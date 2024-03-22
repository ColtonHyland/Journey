// src\app\api\users\[userId]\goals\POST.js
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth";

export async function POST(request, params) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  const userId = session.user.id;
  const { title } = await request.json();

  try {
    const goal = await prisma.goal.create({
      data: {
        title,
        userId,
      },
    });
    
    console.log(`userId: ${userId}, goal: ${JSON.stringify(goal)}`);

    return new Response(JSON.stringify(goal), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating goal:', error);
    return new Response(JSON.stringify({ error: 'Failed to create goal'}), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}