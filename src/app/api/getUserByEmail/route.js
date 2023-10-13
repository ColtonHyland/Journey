import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email } = req.body; // Assuming you send the email in the request body
      const user = await prisma.users.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      console.error('Error fetching user by email:', error);
      res.status(500).json({ error: 'Error fetching user' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function getUserByEmail(email) {
//   'use server';
//   console.log("getUserByEmail: ", email)
//   try {
//     const user = await prisma.users.findUnique({
//       where: {
//         email: email,
//       },
//     });
//     return user;
//   } catch (error) {
//     throw new Error(`Error fetching user by email: ${error.message}`);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// export default getUserByEmail;