/*
  Warnings:

  - You are about to drop the column `isVisile` on the `Plapo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Plapo" DROP COLUMN "isVisile",
ADD COLUMN     "isVisible" BOOLEAN NOT NULL DEFAULT false;
