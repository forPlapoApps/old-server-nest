import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RoomsService } from '../rooms.service';

@Injectable()
export class RoomUsersService {
  private readonly prisma: PrismaClient

  constructor(
    private readonly roomService: RoomsService
  ) {
    this.prisma = new PrismaClient();
  }

  async create(roomId: string, userFirebaseId: string) {
    const room = this.roomService.setRoom(roomId)
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
