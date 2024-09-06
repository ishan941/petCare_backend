/*
  Warnings:

  - The `roles` column on the `SignUp` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "SignUp" DROP COLUMN "roles",
ADD COLUMN     "roles" "Role"[];

-- CreateTable
CREATE TABLE "Ads" (
    "id" SERIAL NOT NULL,
    "adsImage" TEXT,

    CONSTRAINT "Ads_pkey" PRIMARY KEY ("id")
);
