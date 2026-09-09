import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ResearchesService } from './researches.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('researches')
export class ResearchesController {
  constructor(private readonly researchesService: ResearchesService) {}

  @Post()
  create(@Body() createResearchDto: any) {
    return this.researchesService.create(createResearchDto);
  }

  @Get()
  findAll() {
    return this.researchesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.researchesService.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.researchesService.updateStatus(id, status);
  }
}
