import { PrismaClient } from "@prisma/client";
import { NextResponse } from 'next/server';

export async function POST(request) {
  const prisma = new PrismaClient();

  if (request.method === "POST") {
    try {
      const userData = await request.json();

      const user = await prisma.users.create({
        data: userData,
      });

      return NextResponse.json({
        message: 'User created',
        user,
      }, {
        status: 201,
      });
    } catch (error) {
      console.error("Error creating a new user:", error);
      return NextResponse.json({
        message: 'Error creating a new user',
      }, {
        status: 500,
      });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return NextResponse.json({
      message: 'Method not allowed',
    }, {
      status: 405, // 405 Method Not Allowed
    });
  }
}

// import { PrismaClient } from "@prisma/client";

// export default async function handler(req, res) {
  
//   const prisma = new PrismaClient();
  
//   if (req.method === "POST") {
//     try {
//       const userData = req.body; // Assuming you send the user data in the request body

//       const user = await prisma.users.create({
//         data: userData,
//       });

//       res.status(201).json(user); // Use a 201 status code for successful creation
//     } catch (error) {
//       console.error("Error creating a new user:", error);
//       res.status(500).json({ error: "Error creating a new user" });
//     }
//   } else {
//     // 405 Method Not Allowed
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function saveUserToDatabase(userData) {
//   try {
//     const user = await prisma.users.create({
//       data: userData,
//     });
//     return user;
//   } catch (error) {
//     throw error;
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// export default saveUserToDatabase;