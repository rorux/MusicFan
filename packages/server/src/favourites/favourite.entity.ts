import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('favourites')
export class Favourite {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '12345', description: 'User ID' })
  @Column()
  userId: number;

  @ApiProperty({ example: '12345', description: 'Album ID' })
  @Column()
  albumId: number;

  @ApiProperty({
    example: "{ id: 123, name: 'Ivan', resourceUrl: 'http://site.ru/123' }",
    description: 'Artist',
  })
  @Column({ type: 'json', nullable: true })
  artist: Record<string, string | number>;

  @ApiProperty({ example: 'Title', description: "Album's name" })
  @Column()
  title: string;

  @ApiProperty({ example: '1992', description: 'Release year' })
  @Column({ nullable: true })
  year: string;

  @ApiProperty({ example: 'Russia', description: 'Country of release' })
  @Column({ nullable: true })
  country: string;

  @ApiProperty({ example: '[Punk, Heavy Metal]', description: 'Music styles' })
  @Column({ type: 'json' })
  style: Array<string>;

  @ApiProperty({ example: '[Cassette, Album]', description: 'Release format' })
  @Column({ type: 'json' })
  format: Array<string>;

  @ApiProperty({ example: 'http://site.ru/cover.jpeg', description: 'Cover photo' })
  @Column()
  coverImage: string;

  @ApiProperty({
    example: "[{ position: '1', type_: 'track', title: 'Intro', duration: '03:42' }]",
    description: 'Tracks',
  })
  @Column({ type: 'json' })
  tracklist: Array<Record<string, string>>;
}
