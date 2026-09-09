import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async logAction(data: {
    userId?: string;
    action: string;
    entity: string;
    entityId?: string;
    ip?: string;
    userAgent?: string;
    metadata?: any;
  }) {
    return this.prisma.auditLog.create({
      data: {
        userId: data.userId,
        action: data.action,
        entity: data.entity,
        entityId: data.entityId,
        ip: data.ip,
        userAgent: data.userAgent,
        metadata: data.metadata
      }
    });
  }

  async findAll(entity?: string, action?: string) {
    return this.prisma.auditLog.findMany({
      where: {
        ...(entity && { entity }),
        ...(action && { action })
      },
      include: {
        user: {
          select: { id: true, name: true, email: true, role: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 100
    });
  }
}
