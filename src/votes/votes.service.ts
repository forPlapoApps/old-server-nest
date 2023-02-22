import { Injectable } from '@nestjs/common';
import { PrismaClient, Vote } from '@prisma/client';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class VotesService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly usersService: UsersService,
  ) {}

  async create(createVoteDto: CreateVoteDto): Promise<Vote> {
    const vote = await this.prisma.vote.create({
      data: {
        plapo: {
          connect: {
            id: createVoteDto.plapoId,
          },
        },
        user: {
          connect: {
            id: createVoteDto.userId,
          },
        },
      },
    });
    return vote;
  }

  async update(
    id: string,
    userFirebaseId: string,
    updateVoteDto: UpdateVoteDto,
  ): Promise<Vote> {
    const user = await this.usersService.findOne(userFirebaseId, 'firebase');
    const vote = await this.prisma.vote.update({
      where: {
        userId_plapoId: {
          userId: user.id,
          plapoId: updateVoteDto.plapoId,
        },
      },
      data: {
        value: updateVoteDto.value,
      },
    });
    return vote;
  }

  async delete(id: string): Promise<Vote> {
    const vote = await this.prisma.vote.delete({
      where: { id },
    });
    return vote;
  }
}
