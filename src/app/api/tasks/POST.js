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

  console.log("Received task data:", { title, description, goalId, assigned_date, start_time, end_time, repeatUntil, daysOfWeek });


  try {
    const tasks = [];
    if (daysOfWeek && repeatUntil) {
        // Generate tasks for each selected day of the week until the repeatUntil date
        const endDate = new Date(repeatUntil);
        let currentDate = new Date(assigned_date);
        console.log(`Generating repeated tasks from ${currentDate.toISOString()} to ${endDate.toISOString()}`);

        while (currentDate <= endDate) {
            const dayOfWeek = currentDate.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
            console.log(`Checking date: ${currentDate.toISOString()} (Day ${dayOfWeek})`);

            if (daysOfWeek.includes(dayOfWeek)) {
                const taskData = {
                    title,
                    description,
                    userId,
                    goalId,
                    assigned_date: currentDate,
                    start_time: new Date(`${currentDate.toISOString().split('T')[0]}T${start_time}`),
                    end_time: new Date(`${currentDate.toISOString().split('T')[0]}T${end_time}`),
                };
                console.log("Creating task on:", currentDate.toISOString());
                const task = await prisma.task.create({ data: taskData });
                tasks.push(task);
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
    } else {
        // Create a single task if not repeating
        console.log("Creating a single task on:", assigned_date);
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

    console.log("Created tasks count:", tasks.length);
    return new NextResponse(JSON.stringify({ tasks }), {
        status: 201,
        headers: {
            'Content-Type': 'application/json',
        },
    });
} catch (error) {
    console.error("Error creating tasks:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to create tasks", details: error.message }), {
        status: 500,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
}