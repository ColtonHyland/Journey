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

  console.log("Received assigned_date:", assigned_date);
  console.log("Received start_time:", start_time);
  console.log("Received end_time:", end_time);

  try {
    const startDateTime = new Date(`${assigned_date}T${start_time}Z`).toISOString();
    const endDateTime = new Date(`${assigned_date}T${end_time}Z`).toISOString();

    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: session.user.id,
        assigned_date: new Date(assigned_date).toISOString(),
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
    console.log("Error Data:", { assigned_date, start_time, end_time });
    return new NextResponse(JSON.stringify({ error: "Failed to create task", details: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
