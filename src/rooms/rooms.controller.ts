import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Room } from '@prisma/client';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  async index(@Res() res) {
    const rooms = await this.roomsService.findAllRooms();
    return res.status(200).json(rooms);
  }

  @Get(':id')
  async show(@Param('id') id: string, @Res() res) {
    const room = await this.roomsService.findRoom(id);
    if (!room) {
      return res.status(404).json({ message: 'Room not Found.' });
    }
    return res.status(200).json(room);
  }

  @Post()
  async create(@Res() res) {
    const room = await this.roomsService.createRoom();
    return res.status(200).json(room)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() roomParams: Room, @Res() res): Promise<Room> {
    const room = await this.roomsService.updateRoom(id, roomParams)
    return res.status(200).json(room)
  }
}
