import { PrismaClient } from '@prisma/client';



export default async function handler(req, res) {
  const prisma = new PrismaClient();
  if (req.method === 'GET') {
    try {
      const tasks = await prisma.tasks_and_goals.findMany({
        where: {
          user_id: 1, // Replace with the user's ID or obtain it securely
          type: 'task', // Replace with the appropriate task type
        },
      });

      res.status(200).json(tasks);
    } catch (error) {
      console.error('Error fetching daily tasks:', error);
      res.status(500).json({ error: 'Error fetching tasks' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function getDailyTasks(user_id) {
//   'use server';
//   console.log('getDailyTasks for user_id:', user_id);
//   try {
//     const tasks = await prisma.tasks_and_goals.findMany({
//       where: {
//         user_id: user_id,
//         type: 'task', // Assuming daily tasks have the type 'task'
//         // You can add more conditions or filters here if needed
//       },
//     });
//     return tasks;
//   } catch (error) {
//     throw new Error(`Error fetching daily tasks: ${error.message}`);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// export default getDailyTasks;

// const { data: session } = useSession();
//   const router = useRouter();

//   // Check if the user is logged in and retrieve the user_id
//   const user_id = session?.user?.id; // Update 'user_id' according to your NextAuth session data

//   React.useEffect(() => {
//     if (!user_id) {
//       // Redirect to the landing page or login page if the user is not logged in
//       router.push('/');
//     }
//   }, [user_id]);