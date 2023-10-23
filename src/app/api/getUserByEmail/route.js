import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();

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
        res.status(200).json(user); // Move the response here
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

// import { PrismaClient } from '@prisma/client';

// export default async function handle(req, res) {
//   const prisma = new PrismaClient();
//   console.log("request: ", req);
  
//   try {
//     const { email } = req.body; // Assuming you send the email in the request body
//     const user = await prisma.users.findUnique({
//       where: {
//         email: email,
//       },
//     });

//     if (!user) {
//       res.status(404).json({ error: 'User not found' });
//     } else {
//       res.status(200).json(user); // Move the response here
//     }
//   } catch (error) {
//     console.error('Error fetching user by email:', error);
//     res.status(500).json({ error: 'Error fetching user' });
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// export async function POST() {
//   const res = await fetch('https://data.mongodb-api.com/...', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'API-Key': process.env.DATA_API_KEY,
//     },
//     body: JSON.stringify({ time: new Date().toISOString() }),
//   })
 
//   const data = await res.json()
 
//   return Response.json(data)
// }

// getUserByEmail.js

// export async function getUserByEmail(email) {
//   try {
//     const response = await fetch('/api/getUserByEmail', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email }), // Send the email in the request body
//     });

//     if (response.ok) {
//       const user = await response.json();
//       return user;
//     } else {
//       throw new Error('Error fetching user by email');
//     }
//   } catch (error) {
//     throw new Error(`Error fetching user by email: ${error.message}`);
//   }
// }

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