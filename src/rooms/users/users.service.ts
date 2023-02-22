import { Injectable } from '@nestjs/common';
import { Plapo, PrismaClient, Room, User } from '@prisma/client';
import { RoomsService } from '../rooms.service';
import { VotesService } from 'src/votes/votes.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RoomUsersService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly roomsService: RoomsService,
    private readonly votesService: VotesService,
    private readonly usersService: UsersService,
  ) {}

  async create(roomId: string, userFirebaseId: string) {
    const user = await this.usersService.findOne(userFirebaseId, 'firebase');
    if (!this.hasAlreadyEntered(roomId, user)) {
      const room = await this.connectRoomWithUser(roomId, user.id);
      await this.votesService.create({
        userId: user.id,
        plapoId: room.plapo.id,
      });
      await this.votesService.calcuratePlapoValue(room.plapo.id)
    }
    return await this.roomsService.findOne(roomId);
  }

  async delete(roomId: string, userFirebaseId: string) {
    const user = await this.usersService.findOne(userFirebaseId, 'firebase');
    if (this.hasAlreadyEntered(roomId, user)) {
      const room = await this.disconnectRoomAndUser(roomId, user.id);
      await this.votesService.delete(user.votes[0].id);
      await this.votesService.calcuratePlapoValue(room.plapo.id)
    }
    return await this.roomsService.findOne(roomId);
  }

  private hasAlreadyEntered(
    roomId: string,
    user: User & { rooms: Room[] },
  ): boolean {
    return user.rooms.some((room) => room.id === roomId);
  }

  private async connectRoomWithUser(
    roomId: string,
    userId: string,
  ): Promise<Room & { users: User[]; plapo: Plapo }> {
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

  private async disconnectRoomAndUser(
    roomId: string,
    userId: string,
  ): Promise<Room & { users: User[]; plapo: Plapo }> {
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
}
