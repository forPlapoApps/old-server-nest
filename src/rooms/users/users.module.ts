import { Module } from '@nestjs/common';
import { RoomUsersService } from './users.service';
import { RoomUsersController } from './users.controller';
import { AuthModule } from 'src/guard/auth/auth.module';

@Module({
  controllers: [RoomUsersController],
  providers: [RoomUsersService],
  imports: [AuthModule]
})
export class RoomUsersModule {}
