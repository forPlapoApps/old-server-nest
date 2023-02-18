import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RoomUsersService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(roomId: string, userFirebaseId: string) {
    const room = await this.prisma.room.findFirst({
      where: { id: roomId },
      include: { users: true },
    });
    const user = await this.prisma.user.findFirst({
      where: { firebaseId: userFirebaseId },
    });

    if (!(room && user)) {
      throw new NotFoundException();
    }

    // RoomUserの処理を書く

    return room;
  }
}
