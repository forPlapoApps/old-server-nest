import { Injectable } from '@nestjs/common';
import { PrismaClient, Vote } from '@prisma/client';
import { CreateVoteDto } from './dto/create-vote.dto';

@Injectable()
export class VotesService {
  constructor(private readonly prisma: PrismaClient) {}

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
}
