import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RoomsService } from '../rooms.service';

@Injectable()
export class RoomUsersService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly roomsService: RoomsService,
  ) {}

  async create(roomId: string, userFirebaseId: string) {
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
      include: { users: true },
    });

    return await this.roomsService.findOne(room.id)
  }

  async delete(roomId: string, userFirebaseId: string) {
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
      include: { users: true },
    });

    return await this.roomsService.findOne(room.id)
  }
}
