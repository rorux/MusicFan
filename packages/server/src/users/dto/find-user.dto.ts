import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class FindUserDto implements Omit<CreateUserDto, 'name'> {
  @ApiProperty({ example: 'Ivan', description: 'Latin letters or/and digits' })
  login: string;

  @ApiProperty({ example: 'Ivan', description: 'Latin letters or/and digits or/and special symbols' })
  password: string;
}
