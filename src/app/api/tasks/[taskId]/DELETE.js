import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {

  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  const userId = session.user.id;
  const { taskId } = params.taskId ? params : {};


  try {
    const task = await prisma.task.delete({
      where: { 
        userId: userId,
        task_id: taskId,
       },
    })

    return new NextResponse(JSON.stringify(task), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to delete task' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}