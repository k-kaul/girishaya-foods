/*
  Warnings:

  - Added the required column `quantity` to the `CartItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."CartItems" ADD COLUMN     "quantity" TEXT NOT NULL;
