import prisma from '@/lib/prisma';
import { getServerUser } from "@/lib/getServerUser";
import { NextResponse } from "next/server";
import { startOfDay, endOfDay } from 'date-fns';

export async function GET(request) {
  const user = await getServerUser(request);
  const userId = user.id;

  try {
    const dailyTasks = await prisma.task.findMany({
      where: {
        userId,
        createdAt: {
          gte: startOfDay(new Date()),
          lte: endOfDay(new Date()),
        },
      }
    });

    return new NextResponse(JSON.stringify({ dailyTasks }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Error fetching daily tasks:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to fetch daily tasks" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}