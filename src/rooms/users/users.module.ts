import { Module } from '@nestjs/common';
import { RoomUsersService } from './users.service';
import { RoomUsersController } from './users.controller';
import { AuthModule } from 'src/guard/auth/auth.module';
import { RoomsService } from '../rooms.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [RoomUsersController],
  providers: [RoomUsersService, RoomsService, UsersService],
  imports: [AuthModule],
})
export class RoomUsersModule {}
