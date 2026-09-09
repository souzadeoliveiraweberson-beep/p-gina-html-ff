import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.users.findMany({ select: { id: true, name: true, email: true, created_at: true } });
  }

  async findOne(id: string) {
    const user = await this.prisma.users.findUnique({
      where: { id },
      include: { user_roles: { include: { role: true } } },
    });
    if (!user) throw new NotFoundException('User not found');
    const { password_hash, ...result } = user;
    return result;
  }

  async create(data: any) {
    const password_hash = await argon2.hash(data.password);
    return this.prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        password_hash,
      },
    });
  }

  async update(id: string, data: any) {
    let password_hash;
    if (data.password) {
      password_hash = await argon2.hash(data.password);
    }
    return this.prisma.users.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.email && { email: data.email }),
        ...(password_hash && { password_hash }),
      },
    });
  }

  async remove(id: string) {
    return this.prisma.users.delete({ where: { id } });
  }
}
