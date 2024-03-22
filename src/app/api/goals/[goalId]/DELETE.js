import prisma from '@/lib/prisma';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

export async function DELETE(request, { params}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const userId = session.user.id;
  const goal_id = params.goalId;

  try {
    const goal = await prisma.goal.delete({
      where: {
        userId,
        goal_id,
      },
    });

    return new Response(JSON.stringify({ message: 'Goal deleted successfully', goal }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error deleting goal:', error);
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}