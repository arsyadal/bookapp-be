-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "borrowedAt" TIMESTAMP(3),
ADD COLUMN     "borrowedBy" TEXT;
