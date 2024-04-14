/*
  Warnings:

  - You are about to drop the column `assigned_date` on the `Goal` table. All the data in the column will be lost.
  - Added the required column `due_date` to the `Goal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "assigned_date",
ADD COLUMN     "due_date" DATE NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "assigned_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
