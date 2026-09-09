import { Injectable, CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url, user } = req;
    
    return next.handle().pipe(
      tap(async () => {
        if (method !== 'GET') {
          await this.prisma.audit_logs.create({
            data: {
              user_id: user?.userId || null,
              action: method,
              resource: url,
              details: JSON.stringify(req.body),
            },
          });
        }
      }),
    );
  }
}
