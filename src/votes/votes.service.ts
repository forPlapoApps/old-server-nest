import { Injectable } from '@nestjs/common';
import { Plapo, PrismaClient, Vote } from '@prisma/client';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { UsersService } from 'src/users/users.service';
import { PlapoService } from 'src/plapo/plapo.service';

const mean = require('ml-array-mean')

@Injectable()
export class VotesService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly usersService: UsersService,
    private readonly plapoService: PlapoService,
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
      include: { plapo: true },
    });
    await this.updatePlapoValue(vote.plapo.id);
    return vote;
  }

  async delete(id: string): Promise<Vote> {
    const vote = await this.prisma.vote.delete({
      where: { id },
    });
    return vote;
  }

  private async updatePlapoValue(plapoId: string): Promise<Plapo> {
    const plapo = await this.plapoService.findOne(plapoId)
    const ave = mean(plapo.votes.map((vote) => vote.value))
    
    return await this.plapoService.update(plapo.id, {
      ave,
      agreement: 10,
      isVisible: true,
    });
  }
}
