import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Иван', description: 'User name' })
  @Column()
  name: string;

  @ApiProperty({ example: 'Ivan', description: 'User login' })
  @Column()
  login: string;

  @ApiProperty({ example: '123456', description: "The user's password" })
  @Column()
  password: string;

  @ApiProperty({ example: 'true', description: 'Is the user active or not' })
  @Column({ default: true })
  isActive: boolean;
}
