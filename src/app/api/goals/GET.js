
import prisma from '@/lib/prisma';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const userId = session.user.id;

  try {

    const goals = await prisma.goal.findMany({
      where: { userId, status: 'active'},
    });

    if (!goals) {
      return new Response(JSON.stringify({ error: 'Goal not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify({ goals }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching goal:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch goal' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}