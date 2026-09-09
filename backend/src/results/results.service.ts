import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ResultsService {
  constructor(private prisma: PrismaService) {}

  async getResearchResults(researchId: string, filters?: {
    municipality?: string;
    interviewerId?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const research = await this.prisma.research.findUnique({
      where: { id: researchId },
      include: {
        questions: {
          include: { options: true }
        }
      }
    });

    if (!research) throw new NotFoundException('Pesquisa não encontrada');

    // Build Response filter
    const responseWhere: any = {
      researchId,
      status: 'valid'
    };
    if (filters?.municipality) responseWhere.municipality = filters.municipality;
    if (filters?.interviewerId) responseWhere.interviewerId = filters.interviewerId;

    const totalResponses = await this.prisma.response.count({ where: responseWhere });
    const totalForms = await this.prisma.printedForm.count({ where: { researchId } });
    const processedForms = await this.prisma.printedForm.count({ where: { researchId, status: 'PROCESSED' } });
    const reviewForms = await this.prisma.printedForm.count({ where: { researchId, status: 'REVIEW_NEEDED' } });

    // Calculate Rankings per question
    const questionResults = [];

    for (const question of research.questions) {
      const answers = await this.prisma.responseAnswer.findMany({
        where: {
          questionId: question.id,
          response: responseWhere
        },
        include: { option: true }
      });

      // Group counts by option
      const optionCounts: Record<string, number> = {};
      let validVotesCount = 0;

      for (const option of question.options) {
        optionCounts[option.id] = 0;
      }

      for (const ans of answers) {
        if (ans.optionId) {
          optionCounts[ans.optionId] = (optionCounts[ans.optionId] || 0) + 1;
          const opt = question.options.find(o => o.id === ans.optionId);
          // Excluding "Não respondeu" / "Prefiro não responder" from valid votes denominator if configured
          if (opt && !opt.text.toLowerCase().includes('prefiro não responder') && !opt.text.toLowerCase().includes('não respondeu')) {
            validVotesCount++;
          }
        }
      }

      if (validVotesCount === 0) validVotesCount = answers.length || 1;

      // Ranking items
      const ranking = question.options.map(option => {
        const count = optionCounts[option.id] || 0;
        const percentage = Number(((count / validVotesCount) * 100).toFixed(2));
        return {
          optionId: option.id,
          text: option.text,
          candidateNumber: option.text.match(/Nº\s*(\d+)/)?.[1] || option.id.slice(0, 5),
          votesCount: count,
          percentage
        };
      }).sort((a, b) => b.votesCount - a.votesCount);

      questionResults.push({
        questionId: question.id,
        questionText: question.text,
        type: question.type,
        totalAnswers: answers.length,
        validVotesCount,
        ranking
      });
    }

    return {
      research: {
        id: research.id,
        title: research.title,
        status: research.status,
        state: research.state,
        electionYear: research.electionYear,
        collectionMode: research.collectionMode,
        disclaimer: 'Esta plataforma é uma ferramenta de pesquisa/opinião eleitoral privada e NÃO é um sistema oficial de votação da Justiça Eleitoral.'
      },
      summary: {
        totalResponses,
        totalFormsPrinted: totalForms,
        formsProcessed: processedForms,
        formsReviewNeeded: reviewForms,
        validPercentage: totalForms > 0 ? Math.round((processedForms / totalForms) * 100) : 0
      },
      questionResults
    };
  }

  async getCollectionStats(researchId: string) {
    const totalPrinted = await this.prisma.printedForm.count({ where: { researchId } });
    const totalProcessed = await this.prisma.printedForm.count({ where: { researchId, status: 'PROCESSED' } });
    const totalPending = await this.prisma.printedForm.count({ where: { researchId, status: 'PENDING' } });
    const totalReview = await this.prisma.printedForm.count({ where: { researchId, status: 'REVIEW_NEEDED' } });

    const batches = await this.prisma.formBatch.findMany({
      where: { researchId },
      include: { interviewer: true }
    });

    return {
      totalPrinted,
      totalProcessed,
      totalPending,
      totalReview,
      progressPercent: totalPrinted > 0 ? Math.round((totalProcessed / totalPrinted) * 100) : 0,
      batchesCount: batches.length,
      batchesSummary: batches.map(b => ({
        id: b.id,
        batchNumber: b.batchNumber,
        interviewer: b.interviewer?.name || 'Não atribuído',
        municipality: b.municipality,
        quantity: b.quantity,
        status: b.status
      }))
    };
  }
}
