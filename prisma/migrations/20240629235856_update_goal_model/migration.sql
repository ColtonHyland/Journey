/*
  Warnings:

  - Added the required column `accomplishment` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `achievableQuantifiers` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actionPlan` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicable` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `how` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `howMany` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `howMuch` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matches` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `measurableQuantifiers` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `milestones` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `realistic` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resources` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rightPerson` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rightTime` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `what` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `where` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `who` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `why` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `worthwhile` to the `Goal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Goal" ADD COLUMN     "accomplishment" TEXT NOT NULL,
ADD COLUMN     "achievableQuantifiers" JSONB NOT NULL,
ADD COLUMN     "actionPlan" TEXT NOT NULL,
ADD COLUMN     "applicable" TEXT NOT NULL,
ADD COLUMN     "how" TEXT NOT NULL,
ADD COLUMN     "howMany" TEXT NOT NULL,
ADD COLUMN     "howMuch" TEXT NOT NULL,
ADD COLUMN     "matches" TEXT NOT NULL,
ADD COLUMN     "measurableQuantifiers" JSONB NOT NULL,
ADD COLUMN     "milestones" JSONB NOT NULL,
ADD COLUMN     "realistic" TEXT NOT NULL,
ADD COLUMN     "resources" TEXT NOT NULL,
ADD COLUMN     "rightPerson" TEXT NOT NULL,
ADD COLUMN     "rightTime" TEXT NOT NULL,
ADD COLUMN     "what" TEXT NOT NULL,
ADD COLUMN     "where" TEXT NOT NULL,
ADD COLUMN     "who" TEXT NOT NULL,
ADD COLUMN     "why" TEXT NOT NULL,
ADD COLUMN     "worthwhile" TEXT NOT NULL;
