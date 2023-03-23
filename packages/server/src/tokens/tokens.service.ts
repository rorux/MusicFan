import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { PublicUserDto } from '../users/dto/public-user.dto';
import { TokensDto } from './dto/tokens.dto';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Token) private readonly tokensRepository: Repository<Token>,
    private readonly jwtService: JwtService,
  ) {}

  generateTokens(payload: PublicUserDto): TokensDto {
    const accessToken = this.jwtService.sign(payload, { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '15s' });
    const refreshToken = this.jwtService.sign(payload, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '30s' });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token: string): PublicUserDto {
    try {
      const userData = this.jwtService.verify<PublicUserDto>(token, { secret: process.env.JWT_ACCESS_SECRET });
      return userData as PublicUserDto;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string): PublicUserDto {
    try {
      const userData = this.jwtService.verify<PublicUserDto>(token, { secret: process.env.JWT_REFRESH_SECRET });
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId: number, refreshToken: string): Promise<Token> {
    const token = await this.tokensRepository.findOneBy({
      userId,
    });
    if (token) {
      token.refreshToken = refreshToken;
      await this.tokensRepository.save(token);
      return token;
    }
    const newToken = await this.tokensRepository.create({ userId, refreshToken });
    await this.tokensRepository.save(newToken);
    return newToken;
  }

  async removeToken(refreshToken: string) {
    const token = await this.tokensRepository.delete({ refreshToken });
    return token;
  }

  async findToken(refreshToken: string): Promise<Token> {
    const token = await this.tokensRepository.findOneBy({ refreshToken });
    return token;
  }
}
