/*
  Warnings:

  - You are about to drop the column `daysOfWeek` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `recurrence` on the `Task` table. All the data in the column will be lost.
  - Made the column `goalId` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "daysOfWeek",
DROP COLUMN "dueDate",
DROP COLUMN "endDate",
DROP COLUMN "recurrence",
ALTER COLUMN "goalId" SET NOT NULL;
