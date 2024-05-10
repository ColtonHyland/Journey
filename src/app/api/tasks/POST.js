import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
  const userId = session.user.id;
  const {
    title,
    description,
    goalId,
    assigned_date,
    start_time,
    end_time,
    repeatUntil,
    daysOfWeek,
  } = await request.json();

  // Map days of the week from names to indices
  let daysOfWeekIndices = [];
  if (daysOfWeek && Array.isArray(daysOfWeek)) {
    const dayIndices = {
      'Sunday': 0,
      'Monday': 1,
      'Tuesday': 2,
      'Wednesday': 3,
      'Thursday': 4,
      'Friday': 5,
      'Saturday': 6
    };
    daysOfWeekIndices = daysOfWeek.map(day => dayIndices[day]);
  }

  try {
    const tasks = [];
    if (daysOfWeek && repeatUntil) {
      const endDate = new Date(repeatUntil);
      let currentDate = new Date(assigned_date);

      while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay();
        if (daysOfWeekIndices.includes(dayOfWeek)) {
          const startTimeComplete = new Date(`${currentDate.toISOString().split('T')[0]}T${start_time.split('T')[1]}`);
          const endTimeComplete = new Date(`${currentDate.toISOString().split('T')[0]}T${end_time.split('T')[1]}`);
          const taskData = {
            title,
            description,
            userId,
            goalId,
            assigned_date: currentDate,
            start_time: startTimeComplete,
            end_time: endTimeComplete,
          };
          const task = await prisma.task.create({ data: taskData });
          tasks.push(task);
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else {
      const task = await prisma.task.create({
        data: {
          title,
          description,
          userId,
          goalId,
          assigned_date: new Date(assigned_date),
          start_time: new Date(start_time),
          end_time: new Date(end_time),
        },
      });
      tasks.push(task);
    }

    return new NextResponse(JSON.stringify({ tasks }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating tasks:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Failed to create tasks",
        details: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
