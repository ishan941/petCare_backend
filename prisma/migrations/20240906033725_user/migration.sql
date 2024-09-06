/*
  Warnings:

  - The primary key for the `Authorization` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `roleId` on the `Authorization` table. All the data in the column will be lost.
  - The `id` column on the `Authorization` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `roles` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `Authorization` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Authorization" DROP CONSTRAINT "Authorization_roleId_fkey";

-- DropIndex
DROP INDEX "Authorization_id_key";

-- DropIndex
DROP INDEX "User_password_key";

-- AlterTable
ALTER TABLE "Authorization" DROP CONSTRAINT "Authorization_pkey",
DROP COLUMN "roleId",
ADD COLUMN     "role" "Role" NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "method" SET NOT NULL,
ALTER COLUMN "method" SET DATA TYPE TEXT,
ADD CONSTRAINT "Authorization_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "createdDate" DROP NOT NULL,
DROP COLUMN "roles",
ADD COLUMN     "roles" TEXT[],
ALTER COLUMN "rmark" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "role";
