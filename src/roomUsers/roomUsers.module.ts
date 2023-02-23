import { Module } from '@nestjs/common';
import { RoomUsersService } from './roomUsers.service';
import { RoomUsersController } from './roomUsers.controller';
import { AuthModule } from 'src/guard/auth/auth.module';
import { RoomsService } from '../rooms/rooms.service';
import { UsersService } from 'src/users/users.service';
import { PrismaClient } from '@prisma/client';
import { PlapoService } from 'src/plapo/plapo.service';
import { VotesService } from 'src/votes/votes.service';

@Module({
  controllers: [RoomUsersController],
  providers: [
    RoomUsersService,
    RoomsService,
    UsersService,
    PrismaClient,
    PlapoService,
    VotesService,
  ],
  imports: [AuthModule],
})
export class RoomUsersModule {}
