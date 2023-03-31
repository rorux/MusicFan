import { Body, Controller, Post, Res } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { FindUserDto } from '../users/dto/find-user.dto';
import { AuthService } from './auth.service';
import { PublicUserAndTokensDto } from './dto/public-user-and-tokens.dto';
import { Response } from 'express';
import { refreshTokenMaxAge } from '../const';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService /*, private i18n: i18nService<i18nTranslations>*/) {}

  @ApiOperation({ summary: 'Register and get tokens' })
  @ApiResponse({ status: 200, type: PublicUserAndTokensDto })
  @Post('/signup')
  async signUp(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
    @I18n() i18n: I18nContext,
  ): Promise<PublicUserAndTokensDto> {
    const publicUserAndTokens = await this.authService.signUp(userDto, i18n);
    response.cookie('refreshToken', publicUserAndTokens.refreshToken, { maxAge: refreshTokenMaxAge, httpOnly: true });

    return publicUserAndTokens;
  }

  @ApiOperation({ summary: 'Authorize and get tokens' })
  @ApiResponse({ status: 200, type: PublicUserAndTokensDto })
  @Post('/signin')
  async signIn(
    @Body() userDto: FindUserDto,
    @Res({ passthrough: true }) response: Response,
    @I18n() i18n: I18nContext,
  ): Promise<PublicUserAndTokensDto> {
    const publicUserAndTokens = await this.authService.signIn(userDto, i18n);
    response.cookie('refreshToken', publicUserAndTokens.refreshToken, { maxAge: refreshTokenMaxAge, httpOnly: true });

    return publicUserAndTokens;
  }
}
