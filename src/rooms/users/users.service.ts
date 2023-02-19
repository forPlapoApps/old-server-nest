import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RoomUsersService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(roomId: string, userFirebaseId: string) {
    const room = await this.prisma.room.update({
      where: { id: roomId },
      data: {
        users: {
          connect: { firebaseId: userFirebaseId },
        },
      },
      include: { users: true },
    });

    return room;
  }

  async delete(roomId: string, userFirebaseId: string) {
    const room = await this.prisma.room.update({
      where: { id: roomId },
      data: {
        users: {
          disconnect: { firebaseId: userFirebaseId },
        },
      },
      include: { users: true },
    });

    return room;
  }
}
