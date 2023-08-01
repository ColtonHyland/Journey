const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({ log: ['query']})

async function main() {
  
  await prisma.users.deleteMany();
  const user = await prisma.users.create({
    data: {
      username: 'Colton Hyland',
      email: 'colthyland@gmail.com',
      password: 'password123',
    },
  })
  console.log(user)
};

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })