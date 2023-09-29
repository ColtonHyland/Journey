/*
  Warnings:

  - You are about to drop the `tasks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `timeframes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_timeframe_id_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_user_id_fkey";

-- DropForeignKey
ALTER TABLE "timeframes" DROP CONSTRAINT "timeframes_user_id_fkey";

-- DropTable
DROP TABLE "tasks";

-- DropTable
DROP TABLE "timeframes";

-- CreateTable
CREATE TABLE "tasks_and_goals" (
    "task_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "due_date" DATE,
    "status" VARCHAR(20),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "journal_entry" TEXT,

    CONSTRAINT "tasks_and_goals_pkey" PRIMARY KEY ("task_id")
);

-- AddForeignKey
ALTER TABLE "tasks_and_goals" ADD CONSTRAINT "tasks_and_goals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
