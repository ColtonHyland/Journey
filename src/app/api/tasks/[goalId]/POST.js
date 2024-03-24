import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  const userId = session.user.id;
  const { goalId } = params.goalId ? params : {};

  try {
    const { title, status } = await request.json();
    const task = await prisma.task.create({
      data: { 
        title,
        status: 'In Progress',
        goalId: goalId,
        userId: userId,
      },
    });

    console.log(`Task created: ${JSON.stringify(task)}`);

    return new Response(JSON.stringify(task), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating task:', error);
    return new Response(JSON.stringify({ error: 'Failed to create task' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}