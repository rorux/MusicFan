import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { FindUserDto } from '../users/dto/find-user.dto';
import { AuthService } from './auth.service';
import { PublicUserAndTokensDto } from './dto/public-user-and-tokens.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Register and get tokens' })
  @ApiResponse({ status: 200, type: PublicUserAndTokensDto })
  @Post('/signup')
  signUp(@Body() userDto: CreateUserDto): Promise<PublicUserAndTokensDto> {
    return this.authService.signUp(userDto);
  }

  @ApiOperation({ summary: 'Authorize and get tokens' })
  @ApiResponse({ status: 200, type: PublicUserAndTokensDto })
  @Post('/signin')
  signIn(@Body() userDto: FindUserDto): Promise<PublicUserAndTokensDto> {
    return this.authService.signIn(userDto);
  }
}
