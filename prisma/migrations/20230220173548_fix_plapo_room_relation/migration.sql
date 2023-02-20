/*
  Warnings:

  - You are about to drop the column `plapoId` on the `Room` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roomId]` on the table `Plapo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roomId` to the `Plapo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_plapoId_fkey";

-- DropIndex
DROP INDEX "Room_plapoId_key";

-- AlterTable
ALTER TABLE "Plapo" ADD COLUMN     "roomId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "plapoId";

-- CreateIndex
CREATE UNIQUE INDEX "Plapo_roomId_key" ON "Plapo"("roomId");

-- AddForeignKey
ALTER TABLE "Plapo" ADD CONSTRAINT "Plapo_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
