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
  const { title, description, goalId, assigned_date, start_time, end_time } = await request.json();
  const fullDateTime = new Date(assigned_date + 'T00:00:00Z').toISOString();
  const startDateTime = new Date(`${assigned_date}T${start_time}:00Z`).toISOString();
  const endDateTime = new Date(`${assigned_date}T${end_time}:00Z`).toISOString();

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId,
        assigned_date: fullDateTime,
        start_time: startDateTime,
        end_time: endDateTime,
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