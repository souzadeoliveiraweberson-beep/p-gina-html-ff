import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AIService } from './ai.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('ai')
@Controller('ai')
export class AIController {
  constructor(private readonly aiService: AIService) {}

  @Post('interpret')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Interpretar comando em linguagem natural para geração de pesquisa' })
  interpret(@Body() body: { prompt: string }) {
    return this.aiService.interpret(body.prompt);
  }
}
