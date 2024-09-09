/*
  Warnings:

  - You are about to drop the `Categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Categories";

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "categoriesImage" TEXT,
    "categoriesName" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);
