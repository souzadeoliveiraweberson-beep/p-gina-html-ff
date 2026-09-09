import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.prisma.users.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await argon2.verify(user.password_hash, pass);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);
    
    // Generate refresh token
    const refresh_token = uuidv4();
    const expires_at = new Date();
    expires_at.setDate(expires_at.getDate() + 7); // 7 days

    await this.prisma.refresh_tokens.create({
      data: {
        user_id: user.id,
        token: refresh_token,
        expires_at
      }
    });

    return {
      access_token,
      refresh_token,
    };
  }

  async refreshToken(token: string) {
    const refreshTokenRecord = await this.prisma.refresh_tokens.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!refreshTokenRecord) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (refreshTokenRecord.expires_at < new Date()) {
      await this.prisma.refresh_tokens.delete({ where: { id: refreshTokenRecord.id } });
      throw new UnauthorizedException('Refresh token expired');
    }

    const user = refreshTokenRecord.user;
    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);

    // Rotate refresh token
    const new_refresh_token = uuidv4();
    const expires_at = new Date();
    expires_at.setDate(expires_at.getDate() + 7);

    await this.prisma.refresh_tokens.update({
      where: { id: refreshTokenRecord.id },
      data: { token: new_refresh_token, expires_at }
    });

    return {
      access_token,
      refresh_token: new_refresh_token,
    };
  }
}
