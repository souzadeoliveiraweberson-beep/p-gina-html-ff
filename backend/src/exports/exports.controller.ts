import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ExportsService } from './exports.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('exports')
@Controller('exports')
export class ExportsController {
  constructor(private readonly exportsService: ExportsService) {}

  @Post('research/:researchId/xlsx')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Gerar exportação XLSX com 6 abas (Resumo, Respostas, Candidatos, Estatísticas, Metodologia, Metadados)' })
  exportXlsx(@Param('researchId') researchId: string) {
    return this.exportsService.generateExport(researchId, 'xlsx');
  }

  @Post('research/:researchId/csv')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Gerar exportação em CSV' })
  exportCsv(@Param('researchId') researchId: string) {
    return this.exportsService.generateExport(researchId, 'csv');
  }

  @Post('research/:researchId/pdf')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Gerar relatório em PDF' })
  exportPdf(@Param('researchId') researchId: string) {
    return this.exportsService.generateExport(researchId, 'pdf');
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Verificar status da exportação' })
  getStatus(@Param('id') id: string) {
    return this.exportsService.getExportStatus(id);
  }
}
