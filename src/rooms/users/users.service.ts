import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RoomsService } from '../rooms.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RoomUsersService {
  private readonly prisma: PrismaClient;

  constructor(
    private readonly roomsService: RoomsService,
    private readonly usersService: UsersService,
  ) {
    this.prisma = new PrismaClient();
    this.roomsService = roomsService;
  }

  // RoomとUserの紐付け
  async create(roomId: string, userFirebaseId: string) {
    const user = await this.usersService.setUserFromFirebaseId(userFirebaseId);

    const room = await this.prisma.room.update({
      where: { id: roomId },
      data: {
        users: {
          connect: { firebaseId: userFirebaseId },
        },
        participantsLength: {
          increment: 1,
        },
      },
      include: { users: true, plapo: true },
    });

    // PlapoのVote配列にもUserの情報を追加
    const vote = await this.prisma.vote.create({
      data: {
        value: 0,
        plapo: {
          connect: {
            id: room.plapo.id,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return this.roomsService.setRoom(room.id);
  }

  // RoomとUserの紐付けを解除
  async delete(roomId: string, userFirebaseId: string) {
    const user = await this.usersService.setUserFromFirebaseId(userFirebaseId);

    const room = await this.prisma.room.update({
      where: { id: roomId },
      data: {
        users: {
          disconnect: { firebaseId: userFirebaseId },
        },
        participantsLength: {
          decrement: 1,
        },
      },
      include: { plapo: true },
    });

    // Plapoの中の該当するUserのVoteも消す
    const vote = await this.prisma.vote.deleteMany({
      where: { plapoId: room.plapo.id, userId: user.id },
    });

    return this.roomsService.setRoom(room.id);
  }
}
