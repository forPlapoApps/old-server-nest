/*
  Warnings:

  - You are about to drop the `UserRoom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserRoom` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserRoom" DROP CONSTRAINT "UserRoom_room_id_fkey";

-- DropForeignKey
ALTER TABLE "UserRoom" DROP CONSTRAINT "UserRoom_user_id_fkey";

-- DropForeignKey
ALTER TABLE "_UserRoom" DROP CONSTRAINT "_UserRoom_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserRoom" DROP CONSTRAINT "_UserRoom_B_fkey";

-- DropTable
DROP TABLE "UserRoom";

-- DropTable
DROP TABLE "_UserRoom";

-- CreateTable
CREATE TABLE "RoomUser" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,

    CONSTRAINT "RoomUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RoomUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "RoomUser_user_id_room_id_key" ON "RoomUser"("user_id", "room_id");

-- CreateIndex
CREATE UNIQUE INDEX "_RoomUser_AB_unique" ON "_RoomUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RoomUser_B_index" ON "_RoomUser"("B");

-- AddForeignKey
ALTER TABLE "RoomUser" ADD CONSTRAINT "RoomUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomUser" ADD CONSTRAINT "RoomUser_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomUser" ADD CONSTRAINT "_RoomUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomUser" ADD CONSTRAINT "_RoomUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
