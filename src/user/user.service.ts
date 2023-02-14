import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(createUserDto: CreateUserDto) {
    // NOTE: このupsertはfind_or_create_byのように扱うため、
    //       updateの中身が空になっている。
    const user = await this.prisma.user.upsert({
      where: {
        firebaseId: createUserDto.firebaseId,
      },
      update: {},
      create: createUserDto,
    });

    return user;
  }
}