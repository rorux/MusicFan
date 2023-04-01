import { Response, Request } from 'express';
import { Body, Controller, Get, Post, Res, Req, HttpCode } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { FindUserDto } from '../users/dto/find-user.dto';
import { AuthService } from './auth.service';
import { PublicUserAndTokensDto } from './dto/public-user-and-tokens.dto';
import { refreshTokenMaxAge } from '../constants';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Register and get tokens' })
  @ApiResponse({ status: 201, type: PublicUserAndTokensDto })
  @HttpCode(201)
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
  @HttpCode(200)
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
  @HttpCode(200)
  @Get('/refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @I18n() i18n: I18nContext,
  ): Promise<PublicUserAndTokensDto> {
    const { refreshToken } = request.cookies;
    const publicUserAndTokens = await this.authService.refresh(refreshToken, i18n);
    response.cookie('refreshToken', publicUserAndTokens.refreshToken, { maxAge: refreshTokenMaxAge, httpOnly: true });

    return publicUserAndTokens;
  }

  @ApiOperation({ summary: 'Log out of your account' })
  @ApiResponse({ status: 200 })
  @HttpCode(200)
  @Get('/logout')
  async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<void> {
    const { refreshToken } = request.cookies;
    this.authService.logout(refreshToken);
    response.clearCookie('refreshToken');
  }
}
