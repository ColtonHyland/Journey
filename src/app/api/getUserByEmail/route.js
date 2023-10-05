import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getUserByEmail(email) {
  console.log("getUserByEmail: ", email)
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    throw new Error(`Error fetching user by email: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

export default getUserByEmail;