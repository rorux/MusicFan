import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Иван', description: 'Latin or cyrillic letters' })
  name: string;

  @ApiProperty({ example: 'Ivan', description: 'Latin letters or/and digits' })
  login: string;

  @ApiProperty({ example: 'Ivan', description: 'Latin letters or/and digits or/and special symbols' })
  password: string;
}
