import { Injectable } from '@nestjs/common';
import { PrismaClient, Room, User } from '@prisma/client';
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
      const room = await this.prisma.room.update({
        where: { id: roomId },
        data: {
          users: {
            connect: { firebaseId: userFirebaseId },
          },
          participantsLength: {
            increment: 1,
          },
        },
        include: { users: true, plapo: true },
      });

      await this.votesService.create({
        userId: user.id,
        plapoId: room.plapo.id,
      });
    }

    return await this.roomsService.findOne(roomId);
  }

  async delete(roomId: string, userFirebaseId: string) {
    const user = await this.usersService.findOne(userFirebaseId, 'firebase');

    if (this.hasAlreadyEntered(roomId, user)) {
      const room = await this.prisma.room.update({
        where: { id: roomId },
        data: {
          users: {
            disconnect: { firebaseId: userFirebaseId },
          },
          participantsLength: {
            decrement: 1,
          },
        },
        include: { users: true, plapo: true },
      });

      await this.votesService.delete(user.votes[0].id);
    }

    return await this.roomsService.findOne(roomId);
  }

  hasAlreadyEntered(roomId: string, user: User & { rooms: Room[] }): boolean {
    return user.rooms.filter((room) => room.id == roomId).length != 0;
  }
}
