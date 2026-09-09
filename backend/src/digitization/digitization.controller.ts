import { Controller, Get, Post, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DigitizationService } from './digitization.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('digitization')
@Controller('digitization')
export class DigitizationController {
  constructor(private readonly digitizationService: DigitizationService) {}

  @Post('scan')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Escanear QR Code ou buscar por FORM_ID para digitação' })
  scanForm(@Body() body: { code: string }) {
    return this.digitizationService.scanForm(body.code);
  }

  @Post('submit')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Registrar respostas digitadas de um formulário impresso' })
  submitAnswers(@Body() body: any, @Request() req: any) {
    return this.digitizationService.submitAnswers({
      ...body,
      userId: req.user?.id || 'demo-operator-id'
    });
  }

  @Get('rapid-queue')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter próximo formulário pendente para digitação rápida sequencial' })
  getRapidQueue(@Query('batchId') batchId?: string) {
    return this.digitizationService.getNextPendingInBatch(batchId);
  }

  @Post('flag-review')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Marcar formulário impresso como Ilegível / Revisão Necessária' })
  markReviewNeeded(@Body() body: { formId: string; reason: string }, @Request() req: any) {
    return this.digitizationService.markReviewNeeded(body.formId, body.reason, req.user?.id || 'demo-operator-id');
  }
}
