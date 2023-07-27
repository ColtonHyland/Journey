const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  await prisma.users.deleteMany();
  await prisma.calendar_events.deleteMany();
  await prisma.tasks.deleteMany();
  await prisma.timeframes.deleteMany();
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })