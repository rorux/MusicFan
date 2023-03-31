import * as bcrypt from 'bcryptjs';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { DeleteResult } from 'typeorm';
import { UsersService } from '../users/users.service';
import { TokensService } from '../tokens/tokens.service';
import { User } from '../users/user.entity';
import { PublicUserDto } from '../users/dto/public-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { FindUserDto } from '../users/dto/find-user.dto';
import { PublicUserAndTokensDto } from './dto/public-user-and-tokens.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly tokensService: TokensService) {}

  async getUserDtoAndTokens(user: User): Promise<PublicUserAndTokensDto> {
    const publicUser = new PublicUserDto(user);
    const tokens = await this.tokensService.generateTokens({ ...publicUser });
    await this.tokensService.saveToken(user.id, tokens.refreshToken);

    return { user: publicUser, ...tokens };
  }

  async signUp(userDto: CreateUserDto, i18n: I18nContext): Promise<PublicUserAndTokensDto> {
    const candidate = await this.usersService.getUserByLogin(userDto.login);
    if (candidate) {
      throw new BadRequestException(i18n.t('errors.user-already-exists', { args: { login: userDto.login } }));
    }
    const hashPassword = await bcrypt.hash(userDto.password, 3);
    const user = await this.usersService.createUser({
      name: userDto.name,
      login: userDto.login,
      password: hashPassword,
    });

    return await this.getUserDtoAndTokens(user);
  }

  async signIn(userDto: FindUserDto, i18n: I18nContext): Promise<PublicUserAndTokensDto> {
    const user = await this.usersService.getUserByLogin(userDto.login);
    if (!user) {
      throw new BadRequestException(i18n.t('errors.invalid-data', { args: { login: userDto.login } }));
    }

    const isPasswordCorrect = await bcrypt.compare(userDto.password, user.password);
    if (!isPasswordCorrect) {
      throw new BadRequestException(i18n.t('errors.invalid-data', { args: { login: userDto.login } }));
    }

    return await this.getUserDtoAndTokens(user);
  }

  async logout(refreshToken: string): Promise<DeleteResult> {
    return await this.tokensService.removeToken(refreshToken);
  }

  async refresh(refreshToken: string, i18n: I18nContext): Promise<PublicUserAndTokensDto> {
    if (!refreshToken) {
      throw new UnauthorizedException(i18n.t('errors.unauthorized'));
    }

    const userDtoFromRefreshToken = await this.tokensService.validateRefreshToken(refreshToken);
    const tokenFromDatabase = await this.tokensService.findToken(refreshToken);
    if (!userDtoFromRefreshToken || !tokenFromDatabase) {
      throw new UnauthorizedException(i18n.t('errors.unauthorized'));
    }

    const user = await this.usersService.getUserById(userDtoFromRefreshToken.id);

    return await this.getUserDtoAndTokens(user);
  }
}
