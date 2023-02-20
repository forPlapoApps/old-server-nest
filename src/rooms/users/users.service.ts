import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RoomsService } from '../rooms.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RoomUsersService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly roomsService: RoomsService,
    private readonly usersService: UsersService,
  ) {}

  async create(roomId: string, userFirebaseId: string) {
    const user = await this.usersService.findOneByFirebaseId(userFirebaseId);

    if (!this.isAlreadyConnected(roomId, user)) {
      const room = await this.connectRoomWithUser(roomId, user.id);
      const vote = await this.createVote(room.plapo.id, user.id);
    }

    return this.roomsService.setRoom(roomId);
  }

  async delete(roomId: string, userFirebaseId: string) {
    const user = await this.usersService.findOneByFirebaseId(userFirebaseId);

    if (this.isAlreadyConnected(roomId, user)) {
      const room = await this.disConnectRoomWithUser(roomId, user.id);
      const vote = await this.deleteVote(room.plapo.id, user.id);
    }

    return this.roomsService.setRoom(roomId);
  }

  private isAlreadyConnected(roomId: string, user): boolean {
    return user.rooms.filter((room) => room.id == roomId).length != 0;
  }

  private async connectRoomWithUser(roomId: string, userId: string) {
    const room = await this.prisma.room.update({
      where: { id: roomId },
      data: {
        users: {
          connect: { id: userId },
        },
        participantsLength: {
          increment: 1,
        },
      },
      include: { users: true, plapo: true },
    });
    return room;
  }

  private async disConnectRoomWithUser(roomId: string, userId: string) {
    const room = await this.prisma.room.update({
      where: { id: roomId },
      data: {
        users: {
          disconnect: { id: userId },
        },
        participantsLength: {
          decrement: 1,
        },
      },
      include: { users: true, plapo: true },
    });

    return room;
  }

  private async createVote(plapoId: string, userId: string) {
    const vote = await this.prisma.vote.create({
      data: {
        value: 0,
        plapo: {
          connect: {
            id: plapoId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return vote;
  }

  private async deleteVote(plapoId: string, userId: string) {
    const vote = await this.prisma.vote.deleteMany({
      where: { plapoId: plapoId, userId: userId },
    });

    return vote;
  }
}
