import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FormsService {
  constructor(private prisma: PrismaService) {}

  async createBatch(dto: {
    researchId: string;
    quantity: number;
    interviewerId?: string;
    municipality?: string;
    location?: string;
    pageSize?: string;
    userId: string;
  }) {
    const research = await this.prisma.research.findUnique({
      where: { id: dto.researchId }
    });
    if (!research) throw new NotFoundException('Pesquisa não encontrada');

    const countBatches = await this.prisma.formBatch.count({
      where: { researchId: dto.researchId }
    });
    const batchNumber = String(countBatches + 1).padStart(3, '0');

    // Create Batch
    const batch = await this.prisma.formBatch.create({
      data: {
        researchId: dto.researchId,
        batchNumber,
        quantity: dto.quantity,
        interviewerId: dto.interviewerId,
        municipality: dto.municipality || 'Porto Velho',
        location: dto.location || 'Centro',
        pageSize: dto.pageSize || 'A4',
        status: 'GENERATED',
        generatedBy: dto.userId
      }
    });

    // Create Printed Forms
    const printedForms = [];
    const statePrefix = research.state || 'RO';
    const yearSuffix = String(research.electionYear || 2026).slice(-2);
    const muniPrefix = (dto.municipality || 'PV').slice(0, 2).toUpperCase();

    for (let i = 1; i <= dto.quantity; i++) {
      const seqStr = String(i).padStart(6, '0');
      const formId = `${statePrefix}${yearSuffix}-${muniPrefix}-${seqStr}`;
      const qrCodeData = `FORM-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

      printedForms.push({
        batchId: batch.id,
        researchId: dto.researchId,
        formNumber: String(i),
        formId,
        qrCodeData,
        interviewerId: dto.interviewerId,
        municipality: dto.municipality || 'Porto Velho',
        status: 'PENDING'
      });
    }

    await this.prisma.printedForm.createMany({
      data: printedForms
    });

    return {
      batch,
      formsCreated: printedForms.length,
      sampleFormId: printedForms[0]?.formId,
      sampleQrCode: printedForms[0]?.qrCodeData
    };
  }

  async findBatchesByResearch(researchId: string) {
    return this.prisma.formBatch.findMany({
      where: { researchId },
      include: {
        interviewer: true,
        printedForms: {
          take: 5
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getBatchDetails(batchId: string) {
    const batch = await this.prisma.formBatch.findUnique({
      where: { id: batchId },
      include: {
        printedForms: true,
        research: true
      }
    });
    if (!batch) throw new NotFoundException('Lote de formulários não encontrado');

    const total = batch.printedForms.length;
    const processed = batch.printedForms.filter(f => f.status === 'PROCESSED').length;
    const pending = batch.printedForms.filter(f => f.status === 'PENDING').length;
    const review = batch.printedForms.filter(f => f.status === 'REVIEW_NEEDED').length;

    return {
      batch,
      stats: {
        total,
        processed,
        pending,
        review,
        progressPercent: total > 0 ? Math.round((processed / total) * 100) : 0
      }
    };
  }
}
