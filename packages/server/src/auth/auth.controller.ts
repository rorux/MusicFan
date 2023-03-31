import { Body, Controller, Get, Post, Res, Req } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { FindUserDto } from '../users/dto/find-user.dto';
import { AuthService } from './auth.service';
import { PublicUserAndTokensDto } from './dto/public-user-and-tokens.dto';
import { Response, Request } from 'express';
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

  @ApiOperation({ summary: 'Check refresh token' })
  @ApiResponse({ status: 200, type: PublicUserAndTokensDto })
  @Get('/refresh')
  async refresh(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
    @I18n() i18n: I18nContext,
  ): Promise<PublicUserAndTokensDto> {
    const { refreshToken } = request.cookies;
    const publicUserAndTokens = await this.authService.refresh(refreshToken, i18n);
    response.cookie('refreshToken', publicUserAndTokens.refreshToken, { maxAge: refreshTokenMaxAge, httpOnly: true });

    return publicUserAndTokens;
  }
}
