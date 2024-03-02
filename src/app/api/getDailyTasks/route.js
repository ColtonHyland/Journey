import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import { getSession } from 'next-auth/react';

export default async function GET(request) {
  const session = await getSession({ req: request });
  if (!session || !session.user) {
    return new Response(JSON.stringify({ error: "Authentication required" }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  const user_id = session?.user?.id;
  const result = await prisma.tasks_and_goals.findMany({
    where: {
      user_id: user_id,
      type: "task",
    },
  });

  return NextResponse.json({result});
}
