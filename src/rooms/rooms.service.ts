import { Injectable } from '@nestjs/common';
import { PrismaClient, Room } from '@prisma/client';

@Injectable()
export class RoomsService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAllRooms(): Promise<Room[]> {
    return await this.prisma.room.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });
  }

  async findRoom(id): Promise<Room> {
    return await this.prisma.room.findFirst({
      where: { id },
    });
  }

  async createRoom(): Promise<Room> {
    const date = new Date
    const today_char: string = date.toString() // 後で変更

    return await this.prisma.room.create({
      data: {
        name: today_char
      }
    })
  }
  
  async updateRoom(id, roomParams): Promise<Room> {
    const { name } = roomParams
    return await this.prisma.room.update({
      where: {
        id
      },
      data: {
        name: name
      }
    })
  }
}
