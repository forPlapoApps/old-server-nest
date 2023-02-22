import { Injectable } from '@nestjs/common';
import { Plapo, PrismaClient, Vote } from '@prisma/client';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { UsersService } from 'src/users/users.service';
import { PlapoService } from 'src/plapo/plapo.service';

const mean = require('ml-array-mean');
const mode = require('ml-array-mode');

@Injectable()
export class VotesService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly usersService: UsersService,
    private readonly plapoService: PlapoService,
  ) {}

  async findOne(id: string) {
    const vote = await this.prisma.vote.findFirst({
      where: { id },
      include: { plapo: true },
    });
    return vote;
  }

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
    return await this.findOne(vote.id);
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
      include: { plapo: true },
    });
    await this.calcuratePlapoValue(vote.plapo.id);
    return await this.findOne(vote.id);
  }

  async delete(id: string): Promise<Vote> {
    const vote = await this.prisma.vote.delete({
      where: { id },
    });
    return vote;
  }

  private async calcuratePlapoValue(plapoId: string): Promise<Plapo> {
    const plapo = await this.plapoService.findOne(plapoId);

    const voteValues: number[] = plapo.votes.map((vote) => vote.value);

    const ave = mean(voteValues);
    const countMode = voteValues.filter(
      (value) => value == mode(voteValues),
    ).length;
    const agreement = (countMode / voteValues.length) * 100;

    return await this.plapoService.update(plapo.id, {
      ave,
      agreement,
      isVisible: false,
    });
  }
}
