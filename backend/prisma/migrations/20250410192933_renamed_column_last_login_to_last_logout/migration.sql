/*
  Warnings:

  - You are about to drop the column `lastLogin` on the `Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "lastLogin",
ADD COLUMN     "lastLogout" TIMESTAMP(3);
