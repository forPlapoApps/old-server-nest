import { Module } from '@nestjs/common';
import { PlapoService } from './plapo.service';
import { PlapoController } from './plapo.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [PlapoController],
  providers: [PlapoService, PrismaClient]
})
export class PlapoModule {}
