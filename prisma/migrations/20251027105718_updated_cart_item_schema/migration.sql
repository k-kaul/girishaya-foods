/*
  Warnings:

  - The primary key for the `CartItems` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CartItems` table. All the data in the column will be lost.
  - Made the column `productName` on table `CartItems` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CartItems" DROP CONSTRAINT "CartItems_pkey",
DROP COLUMN "id",
ALTER COLUMN "productName" SET NOT NULL,
ADD CONSTRAINT "CartItems_pkey" PRIMARY KEY ("productId", "userId");
