import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreatePlapoDto } from './dto/create-plapo.dto';

@Injectable()
export class PlapoService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(createPlapoDto: CreatePlapoDto) {
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

  async remove(id: string) {
    const plapo = await this.prisma.plapo.delete({
      where: { id },
    });

    return plapo;
  }
}
