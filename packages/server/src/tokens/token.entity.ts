import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tokens')
export class Token {
  @ApiProperty({ example: '123', description: "User's Id" })
  @PrimaryColumn()
  userId: number;

  @ApiProperty({ example: 'df45gd3h', description: "User's refresh token" })
  @Column()
  refreshToken: string;
}
