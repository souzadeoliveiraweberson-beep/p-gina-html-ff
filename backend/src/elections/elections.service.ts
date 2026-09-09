import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ElectionsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.elections.create({
      data: {
        name: data.name,
        date: new Date(data.date),
        status: data.status || 'DRAFT',
      },
    });
  }

  async findAll() {
    return this.prisma.elections.findMany();
  }

  async findOne(id: string) {
    const election = await this.prisma.elections.findUnique({
      where: { id },
      include: { researches: true },
    });
    if (!election) throw new NotFoundException('Election not found');
    return election;
  }

  async update(id: string, data: any) {
    return this.prisma.elections.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.date && { date: new Date(data.date) }),
        ...(data.status && { status: data.status }),
      },
    });
  }

  async remove(id: string) {
    return this.prisma.elections.delete({ where: { id } });
  }
}
