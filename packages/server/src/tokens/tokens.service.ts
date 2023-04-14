import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nContext } from 'nestjs-i18n';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Token } from './token.entity';
import { PublicUserDto } from '../users/dto/public-user.dto';
import { TokensDto } from './dto/tokens.dto';
import { accessTokenMaxAge, refreshTokenMaxAge } from '../constants';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Token) private readonly tokensRepository: Repository<Token>,
    private readonly jwtService: JwtService,
  ) {}

  async generateTokens(payload: PublicUserDto): Promise<TokensDto> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: accessTokenMaxAge,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: refreshTokenMaxAge,
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  decodeAuthHeader(authHeader: string, i18n: I18nContext): PublicUserDto {
    if (!authHeader) {
      throw new UnauthorizedException(i18n.t('errors.unauthorized'));
    }

    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      throw new UnauthorizedException(i18n.t('errors.unauthorized'));
    }

    const publicUser = this.validateAccessToken(accessToken);
    if (!publicUser) {
      throw new UnauthorizedException(i18n.t('errors.unauthorized'));
    }

    return publicUser;
  }

  validateAccessToken(token: string): PublicUserDto {
    try {
      const publicUser = this.jwtService.verify<PublicUserDto>(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      return publicUser;
    } catch (e) {
      return null;
    }
  }

  async validateRefreshToken(token: string): Promise<PublicUserDto> {
    try {
      const publicUser = await this.jwtService.verifyAsync<PublicUserDto>(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      return publicUser;
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

  async removeToken(refreshToken: string): Promise<void> {
    await this.tokensRepository.delete({ refreshToken });
  }

  async findToken(refreshToken: string): Promise<Token> {
    return await this.tokensRepository.findOneBy({ refreshToken });
  }
}
