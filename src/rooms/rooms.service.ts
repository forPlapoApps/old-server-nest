import { Injectable } from '@nestjs/common';
import { PrismaClient, Room } from '@prisma/client';

@Injectable()
export class RoomsService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAllRooms(): Promise<Room[]> {
    return await this.prisma.room.findMany();
  }

  async findRoom(id): Promise<Room> {
    return await this.prisma.room.findFirst({
      where: { id }
    })
  }
}
