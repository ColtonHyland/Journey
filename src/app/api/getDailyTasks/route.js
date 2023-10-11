import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getDailyTasks(user_id) {
  console.log('getDailyTasks for user_id:', user_id);
  try {
    const tasks = await prisma.tasks_and_goals.findMany({
      where: {
        user_id: user_id,
        type: 'task', // Assuming daily tasks have the type 'task'
        // You can add more conditions or filters here if needed
      },
    });
    return tasks;
  } catch (error) {
    throw new Error(`Error fetching daily tasks: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

export default getDailyTasks;

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