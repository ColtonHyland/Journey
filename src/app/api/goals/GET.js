// src\app\api\users\[userId]\goals\[goalId]\GET.js

import { prisma } from "../../../lib/prisma";
import { getServerUser } from "../../../lib/getServerUser";

export async function GET(request, { params }) {
  // const { userId } = params;
  const user = await getServerUser(request);
  const userId= user.id;
  console.log("goals GET route userId:", userId)
  console.log("prisma: ", prisma)
  console.log("prisma.goal: ", prisma.goal)
  try {
    const goals = await prisma.goal.findMany({
      where: {
        //goal_id: goalId,
        userId: userId,
      },
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