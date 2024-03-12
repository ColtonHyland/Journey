import { prisma } from "../../../../lib/prisma";

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return new Response(JSON.stringify({ error: "Id is required." }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const result = await prisma.tasks_and_goals.delete({
      where: {
        id,
      },
    });

    return new Response(JSON.stringify(result), {
      status: 200, // Successfully deleted
      message: "Task deleted successfully",
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    console.error("Prisma error details:", error.message);
    return new Response(JSON.stringify({ error: "Failed to delete the task." }), {
        status: 500,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
}