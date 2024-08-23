/*
  Warnings:

  - Made the column `month` on table `Expenses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Expenses" ALTER COLUMN "month" SET NOT NULL;
