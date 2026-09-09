import { Module } from '@nestjs/common';
import { DigitizationService } from './digitization.service';
import { DigitizationController } from './digitization.controller';

@Module({
  controllers: [DigitizationController],
  providers: [DigitizationService],
  exports: [DigitizationService]
})
export class DigitizationModule {}
