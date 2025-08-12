-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "content" TEXT,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "metadata" JSONB;
