import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('tokens')
export class Token {
  @PrimaryColumn()
  userId: number;

  @Column()
  refreshToken: string;
}
