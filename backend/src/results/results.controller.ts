import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ResultsService } from './results.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('results')
@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Get('research/:researchId')
  @ApiOperation({ summary: 'Obter resultados e apuração da pesquisa com ranking e percentuais' })
  getResults(
    @Param('researchId') researchId: string,
    @Query('municipality') municipality?: string,
    @Query('interviewerId') interviewerId?: string
  ) {
    return this.resultsService.getResearchResults(researchId, { municipality, interviewerId });
  }

  @Get('collection-stats/:researchId')
  @ApiOperation({ summary: 'Obter estatísticas de progresso da coleta presencial e digitação' })
  getCollectionStats(@Param('researchId') researchId: string) {
    return this.resultsService.getCollectionStats(researchId);
  }
}
