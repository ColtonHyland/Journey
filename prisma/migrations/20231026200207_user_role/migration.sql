-- AlterTable
ALTER TABLE "users" ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "image" TEXT,
ADD COLUMN     "role" TEXT DEFAULT 'admin';
