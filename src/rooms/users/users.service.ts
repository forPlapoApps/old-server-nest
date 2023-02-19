import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RoomsService } from '../rooms.service';
import { UserService } from 'src/users/user.service';

@Injectable()
export class RoomUsersService {
  private readonly prisma: PrismaClient;

  constructor(
    private readonly roomService: RoomsService,
    private readonly userService: UserService,
  ) {
    this.prisma = new PrismaClient();
  }

  async create(roomId: string, userFirebaseId: string) {
    const room = this.roomService.setRoom(roomId);
    const user = this.userService.setUser(userFirebaseId);

    // RoomUserの処理を書く

    return room;
  }
}
