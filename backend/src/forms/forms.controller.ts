import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FormsService } from './forms.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('forms')
@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post('batch')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Gerar novo lote de formulários impressos com FORM_IDs e QR Codes' })
  createBatch(@Body() body: any, @Request() req: any) {
    return this.formsService.createBatch({
      ...body,
      userId: req.user?.id || 'demo-admin-id'
    });
  }

  @Get('batches/research/:researchId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar lotes de formulários de uma pesquisa' })
  findBatches(@Param('researchId') researchId: string) {
    return this.formsService.findBatchesByResearch(researchId);
  }

  @Get('batch/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter detalhes e estatísticas do lote' })
  getBatchDetails(@Param('id') id: string) {
    return this.formsService.getBatchDetails(id);
  }
}
