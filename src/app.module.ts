import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsModule } from './rooms/rooms.module';
import { UserModule } from './users/users.module';
import { PlapoModule } from './plapo/plapo.module';
import { VotesModule } from './votes/votes.module';

@Module({
  imports: [RoomsModule, UserModule, PlapoModule, VotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
