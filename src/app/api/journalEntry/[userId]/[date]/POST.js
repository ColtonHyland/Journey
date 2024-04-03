import prisma from '@/lib/prisma';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { NextResponse } from 'next/server';

export async function POST(request, { params }) {

  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const userId = session.user.id;
  const { date, content } = params;

  try {
    const journalEntry = await prisma.journalEntry.create({
      data: {
        date,
        content,
        userId,
      },
    });

    return new NextResponse(JSON.stringify({ journalEntry }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
  } catch (error) {
    console.error("Error creating journal entry:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to create journal entry" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

}