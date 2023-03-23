import * as bcrypt from 'bcryptjs';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
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
    const tokens = this.tokensService.generateTokens({ ...publicUser });
    await this.tokensService.saveToken(user.id, tokens.refreshToken);

    return { user: publicUser, ...tokens };
  }

  async signUp(userDto: CreateUserDto): Promise<PublicUserAndTokensDto> {
    const candidate = await this.usersService.getUserByLogin(userDto.login);
    if (candidate) {
      throw new BadRequestException({ message: `Пользователь с логином ${userDto.login} уже существует!` });
    }
    const hashPassword = await bcrypt.hash(userDto.password, 3);
    const user = await this.usersService.createUser({
      name: userDto.name,
      login: userDto.login,
      password: hashPassword,
    });

    return await this.getUserDtoAndTokens(user);
  }

  async signIn(userDto: FindUserDto): Promise<PublicUserAndTokensDto> {
    const user = await this.usersService.getUserByLogin(userDto.login);
    if (!user) {
      throw new BadRequestException({ message: `Неверный логин и/или пароль!` });
    }

    const isPasswordCorrect = await bcrypt.compare(userDto.password, user.password);
    if (!isPasswordCorrect) {
      throw new BadRequestException({ message: `Неверный логин и/или пароль!` });
    }

    return await this.getUserDtoAndTokens(user);
  }

  async logout(refreshToken: string) {
    const token = await this.tokensService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string): Promise<PublicUserAndTokensDto> {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const userDtoFromRefreshToken = this.tokensService.validateRefreshToken(refreshToken);
    const tokenFromDatabase = await this.tokensService.findToken(refreshToken);
    if (!userDtoFromRefreshToken || !tokenFromDatabase) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.getUserById(userDtoFromRefreshToken.id);

    return await this.getUserDtoAndTokens(user);
  }
}
