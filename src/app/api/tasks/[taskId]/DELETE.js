import { prisma } from "../../../../lib/prisma";



export async function DELETE(request) {
  const url = new URL(request.url);
  const taskId = url.pathname.split('/').pop();
  console.log("taskId:", taskId);
  try {
    if (!taskId) {
      return new Response(JSON.stringify({ error: "Task ID is required." }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const result = await prisma.tasks_and_goals.delete({
      where: {
        task_id: taskId,
      },
    });

    return new Response(JSON.stringify({ message: "Task deleted successfully", result }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    return new Response(JSON.stringify({ error: "Failed to delete the task." }), {
        status: 500,
        headers: {
            'Content-Type': 'application/json',
        },
    });
  }
}