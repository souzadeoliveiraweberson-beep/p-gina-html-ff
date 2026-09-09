import { Module } from '@nestjs/common';
import { AIService, LocalAIProvider } from './ai.service';
import { AIController } from './ai.controller';

@Module({
  controllers: [AIController],
  providers: [AIService, LocalAIProvider],
  exports: [AIService]
})
export class AIModule {}
