import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const { email } = req.query; // Assuming you pass the email as a query parameter

    // Fetch the user by email
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
      include: {
        // You can include the daily tasks relationship here
        dailyTasks: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user's daily tasks
    return res.status(200).json(user.dailyTasks);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}

// const response = await fetch(`/api/getDailyTasks?email=${userEmail}`);
// const data = await response.json();

// console.log(data); // This will contain the user's daily tasks