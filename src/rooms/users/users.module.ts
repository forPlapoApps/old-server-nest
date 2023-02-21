import { Module } from '@nestjs/common';
import { RoomUsersService } from './users.service';
import { RoomUsersController } from './users.controller';
import { AuthModule } from 'src/guard/auth/auth.module';
import { RoomsService } from '../rooms.service';
import { UsersService } from 'src/users/users.service';
import { PrismaClient } from '@prisma/client';
import { PlapoService } from 'src/plapo/plapo.service';

@Module({
  controllers: [RoomUsersController],
  providers: [
    RoomUsersService,
    RoomsService,
    UsersService,
    PrismaClient,
    PlapoService,
  ],
  imports: [AuthModule],
})
export class RoomUsersModule {}
