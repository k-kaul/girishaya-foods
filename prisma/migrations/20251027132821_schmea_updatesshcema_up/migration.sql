/*
  Warnings:

  - The primary key for the `CartItems` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[productId,userId]` on the table `CartItems` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `CartItems` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Changed the type of `quantity` on the `CartItems` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CartItems" DROP CONSTRAINT "CartItems_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
DROP COLUMN "quantity",
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD CONSTRAINT "CartItems_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "CartItems_productId_userId_key" ON "CartItems"("productId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
