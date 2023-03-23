import { User } from '../user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class PublicUserDto {
  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.login = user.login;
    this.isActive = user.isActive;
  }

  @ApiProperty({ example: '1', description: 'Unique identifier' })
  id: number;

  @ApiProperty({ example: 'Иван', description: 'Latin or cyrillic letters' })
  name: string;

  @ApiProperty({ example: 'Ivan', description: 'Latin letters or/and digits' })
  login: string;

  @ApiProperty({ example: 'true', description: 'Is the user active or not' })
  isActive: boolean;
}
