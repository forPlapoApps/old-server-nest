import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClient } from '@prisma/client';

type Query = {
  where: { id?: string; firebaseId?: string };
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaClient) {}

  async findOne(id: string, from?: 'firebase') {
    const query: Query = this.getUserQuery(id, from);
    const user = await this.prisma.user.findFirst(query);

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

    return await this.findOne(user.id);
  }

  getUserQuery(userId: string, from?: 'firebase') {
    return from == 'firebase'
      ? { where: { firebaseId: userId } }
      : { where: { id: userId } };
  }
}
