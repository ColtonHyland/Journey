import prisma from '@/lib/prisma';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {

  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  const userId = session.user.id;
  const { date } = params.date ? params : {};

  try {
    const journalEntry = await prisma.journalEntry.delete({
      where: { 
        userId: userId,
        date: date,
       },
    })

    return new NextResponse(JSON.stringify(journalEntry), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error deleting journal entry:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to delete journal entry' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}