import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DigitizationService {
  constructor(private prisma: PrismaService) {}

  async scanForm(code: string) {
    const trimmed = code.trim();
    
    // Find by QR code data or FORM_ID
    let form = await this.prisma.printedForm.findFirst({
      where: {
        OR: [
          { qrCodeData: trimmed },
          { formId: trimmed }
        ]
      },
      include: {
        research: {
          include: {
            questions: {
              include: { options: true }
            }
          }
        },
        interviewer: true
      }
    });

    if (!form) {
      throw new NotFoundException(`Formulário com código ${trimmed} não foi encontrado.`);
    }

    if (form.status === 'PROCESSED') {
      return {
        alreadyProcessed: true,
        message: `Este formulário (${form.formId}) já foi processado em ${form.processedAt ? new Date(form.processedAt).toLocaleString('pt-BR') : 'data anterior'}.`,
        form
      };
    }

    return {
      alreadyProcessed: false,
      form
    };
  }

  async submitAnswers(dto: {
    printedFormId: string;
    answers: Array<{ questionId: string; optionId?: string; textValue?: string }>;
    gender?: string;
    ageGroup?: string;
    education?: string;
    userId: string;
  }) {
    const form = await this.prisma.printedForm.findUnique({
      where: { id: dto.printedFormId }
    });

    if (!form) throw new NotFoundException('Formulário não encontrado');

    if (form.status === 'PROCESSED') {
      throw new BadRequestException(`Este formulário (${form.formId}) já foi processado.`);
    }

    // Create Response
    const response = await this.prisma.response.create({
      data: {
        researchId: form.researchId,
        formId: form.formId,
        interviewerId: form.interviewerId,
        source: 'printed_form',
        status: 'valid',
        answers: {
          create: dto.answers.map(a => ({
            questionId: a.questionId,
            optionId: a.optionId,
            textValue: a.textValue
          }))
        }
      }
    });

    // Update Printed Form status
    await this.prisma.printedForm.update({
      where: { id: form.id },
      data: {
        status: 'PROCESSED',
        processedBy: dto.userId,
        processedAt: new Date()
      }
    });

    // Audit Log
    await this.prisma.formProcessingLog.create({
      data: {
        formId: form.id,
        action: 'DIGITIZED',
        userId: dto.userId,
        metadata: { responseId: response.id, answersCount: dto.answers.length }
      }
    });

    return {
      success: true,
      message: `Formulário ${form.formId} digitado e registrado com sucesso!`,
      responseId: response.id
    };
  }

  async getNextPendingInBatch(batchId?: string) {
    const where: any = { status: 'PENDING' };
    if (batchId) where.batchId = batchId;

    const nextForm = await this.prisma.printedForm.findFirst({
      where,
      include: {
        research: {
          include: {
            questions: {
              include: { options: true }
            }
          }
        }
      },
      orderBy: { formNumber: 'asc' }
    });

    if (!nextForm) {
      return { hasMore: false, message: 'Todos os formulários pendentes foram processados!' };
    }

    const totalCount = await this.prisma.printedForm.count({ where: batchId ? { batchId } : {} });
    const remainingCount = await this.prisma.printedForm.count({ where });

    return {
      hasMore: true,
      form: nextForm,
      progress: {
        remaining: remainingCount,
        total: totalCount,
        completed: totalCount - remainingCount
      }
    };
  }

  async markReviewNeeded(formId: string, reason: string, userId: string) {
    const form = await this.prisma.printedForm.findUnique({ where: { id: formId } });
    if (!form) throw new NotFoundException('Formulário não encontrado');

    await this.prisma.printedForm.update({
      where: { id: formId },
      data: {
        status: 'REVIEW_NEEDED',
        notes: reason
      }
    });

    await this.prisma.formProcessingLog.create({
      data: {
        formId,
        action: 'REVIEWED',
        userId,
        metadata: { reason }
      }
    });

    return { success: true, message: `Formulário ${form.formId} enviado para revisão.` };
  }
}
