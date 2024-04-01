import prisma from '@/lib/prisma';
import { getServerUser } from "@/lib/getServerUser";
import { NextResponse } from 'next/server';

export async function POST(request) {

  const user = await getServerUser(request);
  const userId = user.id;
  const { title, description, goalId } = await request.json();
  
  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId,
      },
    });
    return new NextResponse(JSON.stringify({ task }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to create task" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}