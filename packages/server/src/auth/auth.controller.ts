import { Body, Controller, Post, Res } from '@nestjs/common';
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
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Register and get tokens' })
  @ApiResponse({ status: 200, type: PublicUserAndTokensDto })
  @Post('/signup')
  async signUp(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<PublicUserAndTokensDto> {
    const publicUserAndTokens = await this.authService.signUp(userDto);
    response.cookie('refreshToken', publicUserAndTokens.refreshToken, { maxAge: refreshTokenMaxAge, httpOnly: true });

    return publicUserAndTokens;
  }

  @ApiOperation({ summary: 'Authorize and get tokens' })
  @ApiResponse({ status: 200, type: PublicUserAndTokensDto })
  @Post('/signin')
  async signIn(
    @Body() userDto: FindUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<PublicUserAndTokensDto> {
    const publicUserAndTokens = await this.authService.signIn(userDto);
    response.cookie('refreshToken', publicUserAndTokens.refreshToken, { maxAge: refreshTokenMaxAge, httpOnly: true });

    return publicUserAndTokens;
  }
}
