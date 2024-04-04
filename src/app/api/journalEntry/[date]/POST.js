import prisma from '@/lib/prisma';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { NextResponse } from 'next/server';
import { parseISO } from 'date-fns';

export async function POST(request, { params }) {

  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const userId = session.user.id;

//   const updateJournalEntry = async () => {
//     try {
//         const response = await fetch(`/api/journalEntry/${date}`, {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({ journalEntry }),
//         });
//         if (!response.ok) throw new Error('Failed to update journal entry');
//         fetchJournalEntry(); // Refetch journal entry after updating
//     } catch (error) {
//         setError(error.message);
//     }
// };

  const content = request.json().content;
  const date = params.date ? parseISO(params.date) : null;

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