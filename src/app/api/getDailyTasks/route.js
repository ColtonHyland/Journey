import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export default async function GET(request) {
  const res = await request.json();
  const { user_id, type } = res;
  const result = await prisma.tasks_and_goals.findMany({
    where: {
      user_id: user_id,
      type: type,
    },
  });

  return NextResponse.json({result});
}
