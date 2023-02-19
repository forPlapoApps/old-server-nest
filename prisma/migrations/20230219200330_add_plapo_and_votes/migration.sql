/*
  Warnings:

  - A unique constraint covering the columns `[plapoId]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `plapoId` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "plapoId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Plapo" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ave" INTEGER NOT NULL DEFAULT 0,
    "agreement" INTEGER NOT NULL DEFAULT 0,
    "isVisile" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Plapo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "plapoId" TEXT NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_plapoId_key" ON "Room"("plapoId");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_plapoId_fkey" FOREIGN KEY ("plapoId") REFERENCES "Plapo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_plapoId_fkey" FOREIGN KEY ("plapoId") REFERENCES "Plapo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
