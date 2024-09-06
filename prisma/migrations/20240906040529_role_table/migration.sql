/*
  Warnings:

  - You are about to drop the column `role` on the `Authorization` table. All the data in the column will be lost.
  - The `roles` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `roleId` to the `Authorization` table without a default value. This is not possible if the table is not empty.
  - Made the column `gender` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdDate` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Authorization" DROP COLUMN "role",
ADD COLUMN     "roleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "gender" SET NOT NULL,
ALTER COLUMN "createdDate" SET NOT NULL,
ALTER COLUMN "rmark" SET DATA TYPE VARCHAR,
DROP COLUMN "roles",
ADD COLUMN     "roles" "Role"[];

-- CreateTable
CREATE TABLE "Roles" (
    "roleId" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("roleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Roles_role_key" ON "Roles"("role");

-- AddForeignKey
ALTER TABLE "Authorization" ADD CONSTRAINT "Authorization_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("roleId") ON DELETE RESTRICT ON UPDATE CASCADE;
