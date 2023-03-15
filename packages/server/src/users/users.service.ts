import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const newUser = await this.usersRepository.create(dto);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (user) {
      return user;
    }

    throw new HttpException('Пользователь не найден!', HttpStatus.NOT_FOUND);
  }
}
