-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "daysOfWeek" TEXT,
ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "recurrence" TEXT,
ALTER COLUMN "goalId" DROP NOT NULL;
