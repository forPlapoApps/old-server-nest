import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  async index(@Res() res) {
    const rooms = await this.roomsService.findAllRooms();
    return res.status(HttpStatus.OK).json(rooms);
  }
}
