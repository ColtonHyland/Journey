import prisma from '@/lib/prisma';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { NextResponse } from 'next/server';
import { addDays, eachDayOfInterval, parseISO, isMatch } from 'date-fns';

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const userId = session.user.id;
  const { title, description, goalId, assigned_date, start_time, end_time, repeatUntil, repeatDays } = await request.json();

  try {
    let tasksToCreate = [];
    if (repeatUntil && repeatDays) {
      const startDate = parseISO(assigned_date);
      const endDate = parseISO(repeatUntil);
      eachDayOfInterval({ start: startDate, end: endDate }).forEach(day => {
        if (repeatDays[day.getDay()]) { // Assuming repeatDays is an array reflecting days from 0 (Sunday) to 6 (Saturday)
          tasksToCreate.push({
            title,
            description,
            userId: session.user.id,
            assigned_date: day,
            start_time: new Date(`${day.toISOString().split('T')[0]}T${start_time}`),
            end_time: new Date(`${day.toISOString().split('T')[0]}T${end_time}`),
          });
        }
      });
    } else {
      tasksToCreate.push({
        title,
        description,
        userId: session.user.id,
        assigned_date: new Date(assigned_date),
        start_time: new Date(start_time),
        end_time: new Date(end_time),
      });
    }

    // Batch create tasks
    for (const taskData of tasksToCreate) {
      await prisma.task.create({ data: taskData });
    }

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
