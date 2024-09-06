/*
  Warnings:

  - The `method` column on the `Authorization` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Authorization" DROP COLUMN "method",
ADD COLUMN     "method" TEXT[];
