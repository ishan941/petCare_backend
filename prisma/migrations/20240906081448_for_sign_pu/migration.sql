/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Authorization" DROP CONSTRAINT "Authorization_userId_fkey";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "SignUp" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "favourite" TEXT,
    "shopCart" TEXT,
    "myPetData" TEXT,
    "userImage" TEXT,
    "roles" TEXT[],

    CONSTRAINT "SignUp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SignUp_email_key" ON "SignUp"("email");

-- AddForeignKey
ALTER TABLE "Authorization" ADD CONSTRAINT "Authorization_userId_fkey" FOREIGN KEY ("userId") REFERENCES "SignUp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
