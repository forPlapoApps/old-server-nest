import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  async index(@Res() res) {
    const rooms = await this.roomsService.findAllRooms();
    return res.status(HttpStatus.OK).json(rooms);
  }

  @Get(':id')
  async show(@Param() param, @Res() res) {
    const { id } = param
    const room = await this.roomsService.findRoom(id)
    return res.status(HttpStatus.OK).json(room)
  }
}
