import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CandidatesService } from './candidates.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('candidates')
@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar candidatos por estado e cargo' })
  findAll(@Query('state') state?: string, @Query('position') position?: string) {
    return this.candidatesService.findAll(state, position);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes do candidato' })
  findOne(@Param('id') id: string) {
    return this.candidatesService.findOne(id);
  }

  @Post('sync')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Sincronizar candidatos com fonte de dados (TSE / Adapter)' })
  sync(@Body() body: { state: string; electionYear: number; position: string }) {
    return this.candidatesService.syncFromProvider(body.state, body.electionYear || 2026, body.position);
  }

  @Post('import')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Importar candidatos via XLSX/CSV' })
  importFile(@Body() body: { records: any[] }) {
    return this.candidatesService.importFromXLSX(body.records || []);
  }
}
