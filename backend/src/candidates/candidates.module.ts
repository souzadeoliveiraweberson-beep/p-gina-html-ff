import { Module } from '@nestjs/common';
import { CandidatesService, TSECandidateProvider } from './candidates.service';
import { CandidatesController } from './candidates.controller';

@Module({
  controllers: [CandidatesController],
  providers: [CandidatesService, TSECandidateProvider],
  exports: [CandidatesService, TSECandidateProvider]
})
export class CandidatesModule {}
