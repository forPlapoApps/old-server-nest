import { Controller, Get, Param, Res } from '@nestjs/common';
import { RoomsService } from './rooms.service';

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
    const room = await this.roomsService.findRoom(id)
    if (!room) {
      return res.status(404).json({ message: "Room not Found." })
    }
    return res.status(200).json(room)
  }
}
