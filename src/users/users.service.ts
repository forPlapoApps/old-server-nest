import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findOne(userId: string) {
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
      include: { rooms: true }
    })
    if (!user) {
      throw new NotFoundException();
    }
    return user;
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

  async findOneByFirebaseId(userFirebaseId: string) {
    const user = await this.prisma.user.findFirst({
      where: { firebaseId: userFirebaseId },
      include: { rooms: true },
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
