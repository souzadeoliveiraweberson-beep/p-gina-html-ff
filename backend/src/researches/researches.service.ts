import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ResearchesService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.researches.create({
      data: {
        election_id: data.election_id,
        name: data.name,
        status: 'RASCUNHO',
      },
    });
  }

  async findAll() {
    return this.prisma.researches.findMany();
  }

  async findOne(id: string) {
    const research = await this.prisma.researches.findUnique({
      where: { id },
      include: { research_questions: true, research_candidates: true },
    });
    if (!research) throw new NotFoundException('Research not found');
    return research;
  }

  async updateStatus(id: string, status: string) {
    const validStatuses = ['RASCUNHO', 'ATIVA', 'PAUSADA', 'ENCERRADA', 'ARQUIVADA'];
    if (!validStatuses.includes(status)) {
      throw new BadRequestException('Invalid status');
    }
    return this.prisma.researches.update({
      where: { id },
      data: { status },
    });
  }
}
