import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RoomsService } from '../rooms.service';

@Injectable()
export class RoomUsersService {
  private readonly prisma: PrismaClient;
  
  constructor(private readonly roomsService: RoomsService) {
    this.prisma = new PrismaClient();
    this.roomsService = roomsService;
  }

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
    });

    return this.roomsService.setRoom(room.id);
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
    });

    return this.roomsService.setRoom(room.id);
  }
}
