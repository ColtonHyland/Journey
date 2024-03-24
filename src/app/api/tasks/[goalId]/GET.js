import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  const userId = session.user.id;
  // const { title, status } = await request.json();
  const { goalId } = params.goalId ? params : {};

  try {
    const tasks = await prisma.task.findMany({
      where: { goal_id: goalId },
    })

    return new Response(JSON.stringify(tasks), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error getting task:', error);
    return new Response(JSON.stringify({ error: 'Failed to get task' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}