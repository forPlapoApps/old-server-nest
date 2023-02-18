import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { RoomUsersService } from './users.service';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { UserGuardDecorator } from 'decorators/UserGuardDecorator';

@Controller('rooms/:roomId/users')
export class RoomUsersController {
  constructor(private readonly roomUsersService: RoomUsersService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Param('roomId') roomId: string, @UserGuardDecorator() firebaseUser) {
    return this.roomUsersService.create(roomId, firebaseUser.user_id)
  }
}
