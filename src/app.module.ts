import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsModule } from './rooms/rooms.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [RoomsModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
