import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function PUT(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
  const userId = session.user.id;
  const {
    task_id,
    title,
    description,
    assigned_date,
    start_time,
    end_time,
  } = await request.json();

  try {
    const conflictingTasks = await prisma.task.findMany({
      where: {
        userId,
        assigned_date: new Date(assigned_date),
        AND: [
          {
            start_time: {
              lte: new Date(end_time),
            },
          },
          {
            end_time: {
              gte: new Date(start_time),
            },
          },
          {
            task_id: {
              not: task_id,
            },
          },
        ],
      },
    });

    if (conflictingTasks.length > 0) {
      return new Response(
        JSON.stringify({ error: "Time conflict with another task" }),
        {
          status: 400,
        }
      );
    }

    const updatedTask = await prisma.task.update({
      where: { task_id },
      data: {
        title,
        description,
        assigned_date: new Date(assigned_date),
        start_time: new Date(start_time),
        end_time: new Date(end_time),
      },
    });

    return new NextResponse(JSON.stringify(updatedTask), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Failed to update task",
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
