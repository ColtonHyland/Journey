// src\app\api\users\[userId]\goals\[goalId]\GET.js

import { prisma } from '../../../../../lib/prisma';

export async function GET(request, { params }) {
  const { userId, goalId } = params;

  try {
    const goal = await prisma.goal.findUnique({
      where: {
        id: goalId,
      },
    });

    if (!goal) {
      return new Response(JSON.stringify({ error: 'Goal not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify(goal), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching goal:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch goal' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}