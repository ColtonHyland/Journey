import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  const userId = session.user.id;
  const { title, status } = await request.json();
  const { goalId } = params.goalId ? params : {};

  try {
    const goal = goalId ? await prisma.goal.update({
      where: { goal_id: goalId },
      data: { title, userId, status },
    }) : await prisma.goal.create({
      data: { 
        title,
        status,
        goal: {
          connect: { goal_id: goalId },
        },
        user: {
          connect: { id: userId }, 
        },
      },
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
}