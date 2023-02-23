import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomUsersModule } from '../roomUsers/roomUsers.module';
import { PrismaClient } from '@prisma/client';
import { PlapoService } from 'src/plapo/plapo.service';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService, PrismaClient, PlapoService],
  imports: [RoomUsersModule],
  exports: [RoomsService],
})
export class RoomsModule {}
