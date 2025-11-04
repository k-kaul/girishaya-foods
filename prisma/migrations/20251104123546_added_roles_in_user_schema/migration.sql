-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'SELLER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
