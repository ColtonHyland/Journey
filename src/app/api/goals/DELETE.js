// src\app\api\users\[userId]\goals\[goalId]\DELETE.js

import { prisma } from '@/lib/prisma';

export async function DELETE(request, { params }) {
  const { goalId } = params;

  try {
    const goal = await prisma.goal.delete({
      where: {
        id: goalId,
      },
    });

    return new Response(JSON.stringify({ message: 'Goal deleted successfully', goal }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error deleting goal:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete goal' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}