/*
  Warnings:

  - You are about to drop the column `room_id` on the `RoomUser` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `RoomUser` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,roomId]` on the table `RoomUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roomId` to the `RoomUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `RoomUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RoomUser" DROP CONSTRAINT "RoomUser_room_id_fkey";

-- DropForeignKey
ALTER TABLE "RoomUser" DROP CONSTRAINT "RoomUser_user_id_fkey";

-- DropIndex
DROP INDEX "RoomUser_user_id_room_id_key";

-- AlterTable
ALTER TABLE "RoomUser" DROP COLUMN "room_id",
DROP COLUMN "user_id",
ADD COLUMN     "roomId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RoomUser_userId_roomId_key" ON "RoomUser"("userId", "roomId");

-- AddForeignKey
ALTER TABLE "RoomUser" ADD CONSTRAINT "RoomUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomUser" ADD CONSTRAINT "RoomUser_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
