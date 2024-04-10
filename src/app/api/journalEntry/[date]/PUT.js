import prisma from '@/lib/prisma';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { NextResponse } from 'next/server';
import { parseISO } from 'date-fns';

export async function PUT(request, { params }) {

  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  
  const userId = session.user.id;
  const { date } = params;
  const body = await request.json();
  const { journalEntry: content } = body;

  try {

    const journalEntry = await prisma.journalEntry.upsert({
      where: {
        userId_date: {
          userId: userId,
          date: parseISO(date),
        },
      },
      update: {
        content: content,
      },
      create: {
        userId: userId,
        date: parseISO(date),
        content: content,
      },
    });

    return new NextResponse(JSON.stringify(journalEntry), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error upserting journal entry:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to upsert journal entry' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}