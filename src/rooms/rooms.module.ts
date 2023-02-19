import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomUsersModule } from './users/users.module';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  imports: [RoomUsersModule]
})
export class RoomsModule {}
