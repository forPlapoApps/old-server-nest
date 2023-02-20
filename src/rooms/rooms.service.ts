import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RoomsService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll() {
    const rooms = await this.prisma.room.findMany({
      include: { users: true, plapo: true },
    });
    return rooms;
  }

  findOne(id: string) {
    const room = this.setRoom(id);
    return room;
  }

  async create() {
    const date = new Date();
    const room = await this.prisma.room.create({
      data: {
        name: date.toString(),
      },
    });
    const plapo = await this.prisma.plapo.create({
      data: {
        ave: 0,
        agreement: 0,
        isVisile: false,
        room: {
          connect: {
            id: room.id,
          },
        },
      },
    });

    return await this.setRoom(room.id);
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    const room = await this.prisma.room.update({
      where: { id },
      data: updateRoomDto,
    });
    return room;
  }

  async remove(id: string) {
    const room = await this.prisma.room.delete({
      where: { id },
    });
    return room;
  }

  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  async setRoom(roomId: string) {
    const room = await this.prisma.room.findFirst({
      where: { id: roomId },
      include: { users: true, plapo: true },
    });
    if (!room) {
      throw new NotFoundException();
    }
    return room;
  }
}
