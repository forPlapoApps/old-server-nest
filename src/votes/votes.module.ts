import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { PrismaClient } from '@prisma/client';
import { AuthService } from 'src/guard/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { PlapoService } from 'src/plapo/plapo.service';

@Module({
  controllers: [VotesController],
  providers: [
    VotesService,
    PrismaClient,
    AuthService,
    UsersService,
    PlapoService,
  ],
  exports: [VotesService],
})
export class VotesModule {}
