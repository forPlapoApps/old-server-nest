import { Injectable } from '@nestjs/common';
import { Plapo, PrismaClient, Vote } from '@prisma/client';
import { CreatePlapoDto } from './dto/create-plapo.dto';
import { UpdatePlapoDto } from './dto/update-plapo.dto';

@Injectable()
export class PlapoService {
  constructor(private readonly prisma: PrismaClient) {}

  async findOne(id: string): Promise<Plapo & { votes: Vote[] }> {
    const plapo = await this.prisma.plapo.findFirst({
      where: { id },
      include: { votes: true },
    });
    return plapo;
  }

  async create(createPlapoDto: CreatePlapoDto): Promise<Plapo> {
    const plapo = await this.prisma.plapo.create({
      data: {
        room: {
          connect: {
            id: createPlapoDto.roomId,
          },
        },
      },
    });
    return plapo;
  }

  async update(id: string, updatePlapoDto: UpdatePlapoDto): Promise<Plapo> {
    const plapo = await this.prisma.plapo.update({
      where: { id },
      data: updatePlapoDto,
    });
    return plapo;
  }
}
