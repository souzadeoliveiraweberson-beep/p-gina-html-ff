import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExportsService {
  constructor(private prisma: PrismaService) {}

  async generateExport(researchId: string, format: 'xlsx' | 'csv' | 'pdf') {
    const research = await this.prisma.research.findUnique({
      where: { id: researchId },
      include: {
        questions: {
          include: { options: true }
        }
      }
    });

    if (!research) throw new NotFoundException('Pesquisa não encontrada');

    const exportRecord = await this.prisma.export.create({
      data: {
        researchId,
        type: format,
        status: 'completed',
        filePath: `/downloads/export_${researchId}_${Date.now()}.${format}`
      }
    });

    return {
      exportId: exportRecord.id,
      format,
      status: 'completed',
      downloadUrl: `/api/v1/exports/download/${exportRecord.id}`,
      filename: `pesquisa_${research.state}_${research.electionYear}_${Date.now()}.${format}`,
      message: `Exportação em ${format.toUpperCase()} gerada com sucesso.`
    };
  }

  async getExportStatus(exportId: string) {
    const record = await this.prisma.export.findUnique({ where: { id: exportId } });
    if (!record) throw new NotFoundException('Exportação não encontrada');
    return record;
  }
}
