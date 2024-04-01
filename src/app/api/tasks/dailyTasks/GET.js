import prisma from '@/lib/prisma';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { startOfDay, endOfDay } from 'date-fns';

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const userId = session.user.id;

  try {
    const dailyTasks = await prisma.task.findMany({
      where: {
        userId,
        created_at: {
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