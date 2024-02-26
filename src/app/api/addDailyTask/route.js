import { prisma } from "../../lib/prisma"; // Adjust the import path based on your project structure

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, userId } = req.body;

    try {
      const newTask = await prisma.tasks_and_goals.create({
        data: {
          title,
          userId,
          type: "task", // Assuming type is required and set to "task" for daily tasks
          // Add other fields as necessary, setting default values or nulls
        },
      });

      return res.status(200).json(newTask);
    } catch (error) {
      console.error("Failed to add task:", error);
      return res.status(500).json({ error: "Failed to add task" });
    }
  } else {
    // Handle any requests that aren't POST
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


