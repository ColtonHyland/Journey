-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "end_time" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "start_time" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;
