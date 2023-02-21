import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomUsersModule } from './users/users.module';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService, PrismaClient],
  imports: [RoomUsersModule]
})
export class RoomsModule {}
