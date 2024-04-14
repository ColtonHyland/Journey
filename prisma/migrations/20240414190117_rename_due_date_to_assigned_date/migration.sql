/*
  Warnings:

  - You are about to drop the column `due_date` on the `Goal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "due_date",
ADD COLUMN     "assigned_date" DATE;
