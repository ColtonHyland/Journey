import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function saveUserToDatabase(userData) {
  try {
    const user = await prisma.users.create({
      data: userData,
    });
    return user;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export default saveUserToDatabase;