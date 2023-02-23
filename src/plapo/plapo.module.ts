import { Module } from '@nestjs/common';
import { PlapoService } from './plapo.service';
import { PlapoController } from './plapo.controller';
import { PrismaClient } from '@prisma/client';
import { AuthService } from 'src/guard/auth/auth.service';

@Module({
  controllers: [PlapoController],
  providers: [PlapoService, PrismaClient, AuthService],
  exports: [PlapoService]
})
export class PlapoModule {}
