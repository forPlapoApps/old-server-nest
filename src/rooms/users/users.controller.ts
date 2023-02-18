import { Controller, Post, UseGuards } from '@nestjs/common';
import { RoomUsersService } from './users.service';
import { AuthGuard } from 'src/guard/auth/auth.guard';

@Controller('rooms/:roomId/users')
export class RoomUsersController {
  constructor(private readonly roomUsersService: RoomUsersService) {}

  @Post()
  @UseGuards(AuthGuard)
  create() {
    return this.roomUsersService.create()
  }
}
