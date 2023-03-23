import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { DeleteResult, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { PublicUserDto } from '../users/dto/public-user.dto';
import { TokensDto } from './dto/tokens.dto';
import { accessTokenMaxAge, refreshTokenMaxAge } from '../const';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Token) private readonly tokensRepository: Repository<Token>,
    private readonly jwtService: JwtService,
  ) {}

  async generateTokens(payload: PublicUserDto): Promise<TokensDto> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: `${accessTokenMaxAge / 1000}s`,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: `${refreshTokenMaxAge / 1000}s`,
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async validateAccessToken(token: string): Promise<PublicUserDto> {
    try {
      const userData = await this.jwtService.verifyAsync<PublicUserDto>(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      return userData;
    } catch (e) {
      return null;
    }
  }

  async validateRefreshToken(token: string): Promise<PublicUserDto> {
    try {
      const userData = await this.jwtService.verifyAsync<PublicUserDto>(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
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

  async removeToken(refreshToken: string): Promise<DeleteResult> {
    return await this.tokensRepository.delete({ refreshToken });
  }

  async findToken(refreshToken: string): Promise<Token> {
    return await this.tokensRepository.findOneBy({ refreshToken });
  }
}
