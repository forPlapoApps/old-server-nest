import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaClient, Room } from '@prisma/client';
import { PlapoService } from 'src/plapo/plapo.service';

@Injectable()
export class RoomsService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly plapoService: PlapoService,
  ) {}

  async findAll() {
    const rooms = await this.prisma.room.findMany({ include: { users: true } });
    return rooms;
  }

  async findOne(roomId: string) {
    const room = await this.prisma.room.findFirst({
      where: { id: roomId },
      include: {
        users: true,
        plapo: {
          include: { votes: true },
        },
      },
    });
    if (!room) {
      throw new NotFoundException();
    }
    return room;
  }

  async create(): Promise<Room> {
    const date = new Date();
    const room = await this.prisma.room.create({
      data: {
        name: date.toString(),
      },
    });
    await this.plapoService.create({ roomId: room.id });

    return await this.findOne(room.id);
  }

  async update(id: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const room = await this.prisma.room.update({
      where: { id },
      data: updateRoomDto,
    });

    return await this.findOne(room.id);
  }

  async remove(id: string): Promise<Room> {
    const room = await this.prisma.room.delete({
      where: { id },
    });

    return room;
  }
}
