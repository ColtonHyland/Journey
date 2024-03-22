import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const { title, userId } = await request.json();
    
    if (!title || !userId) {
      return new Response(JSON.stringify({ error: "Title and userId are required." }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const result = await prisma.task.create({
      data: {
        title,
        userId,
        type: "task",
      },
    });

    return new Response(JSON.stringify(result), {
      status: 201, // Successfully created
      message: "Task created successfully",
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Error adding new task:", error);
    console.error("Prisma error details:", error.message);
    return new Response(JSON.stringify({ error: "Failed to add the task." }), {
        status: 500,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
}