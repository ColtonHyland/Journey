/*
  Warnings:

  - Made the column `assigned_date` on table `Goal` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Goal" ALTER COLUMN "assigned_date" SET NOT NULL;
