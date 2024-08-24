/*
  Warnings:

  - Added the required column `month` to the `Jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jobs" ADD COLUMN     "month" TEXT NOT NULL;
