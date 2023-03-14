import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>) {}

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const newUser = await this.usersRepository.create(dto);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async getUserById(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({ id });

    if (user) {
      return user;
    }

    throw new HttpException('Пользователь не найден!', HttpStatus.NOT_FOUND);
  }
}
