import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ElectionsModule } from './elections/elections.module';
import { CandidatesModule } from './candidates/candidates.module';
import { ResearchesModule } from './researches/researches.module';
import { FormsModule } from './forms/forms.module';
import { DigitizationModule } from './digitization/digitization.module';
import { ResultsModule } from './results/results.module';
import { ExportsModule } from './exports/exports.module';
import { AIModule } from './ai/ai.module';
import { AuditModule } from './audit/audit.module';
import { HealthModule } from './health/health.module';
import { AuditInterceptor } from './common/interceptors/audit.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ElectionsModule,
    CandidatesModule,
    ResearchesModule,
    FormsModule,
    DigitizationModule,
    ResultsModule,
    ExportsModule,
    AIModule,
    AuditModule,
    HealthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
  ],
})
export class AppModule {}
