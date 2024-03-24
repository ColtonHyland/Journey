import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  const userId = session.user.id;
  const { goalId } = params.goalId ? params : {};

  try {
    const { title, status } = await request.json();
    const goal = await prisma.goal.update({
      where: { goal_id: goalId },
      data: { title, status },
    });

    console.log(`Goal updated/created: ${JSON.stringify(goal)}`);

    return new Response(JSON.stringify(goal), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating/updating goal:', error);
    return new Response(JSON.stringify({ error: 'Failed to create/update goal' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};