import prisma from '@/lib/prisma';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { NextResponse } from 'next/server';

export async function POST(request) {

  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const userId = session.user.id;
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