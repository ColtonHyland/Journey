import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { useSession } from 'next-auth/react';

export async function GET(request) {
  // console.log("Before getSession call");
  // const session = useSession({ req: request });
  // console.log("After getSession call:", session); 
  // if (!session || !session.user) {
  //   return new Response(JSON.stringify({ error: "Authentication required" }), {
  //     status: 401,
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  // }
  // const user_id = session?.user?.id;
  // const result = await prisma.tasks_and_goals.findMany({
  //   where: {
  //     user_id: user_id,
  //     type: "task",
  //   },
  // });
  return NextResponse.json({message: "Test endpoint reached successfully" });
  return NextResponse.json({result});
}
