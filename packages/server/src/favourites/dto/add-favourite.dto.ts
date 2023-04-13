import { ApiProperty } from '@nestjs/swagger';

export class AddFavouriteDto {
  @ApiProperty({ example: '12345', description: 'User ID' })
  userId: number;

  @ApiProperty({ example: '12345', description: 'Album ID' })
  albumId: number;

  @ApiProperty({ example: 'Title', description: "Album's name" })
  title: string;

  @ApiProperty({ example: '1992', description: 'Release year' })
  year: string;

  @ApiProperty({ example: 'Russia', description: 'Country of release' })
  country: string;

  @ApiProperty({ example: '[Punk, Heavy Metal]', description: 'Music styles' })
  style: Array<string>;

  @ApiProperty({ example: '[Cassette, Album]', description: 'Release format' })
  format: Array<string>;

  @ApiProperty({ example: 'http://site.ru/cover.jpeg', description: 'Cover photo' })
  coverImage: string;

  @ApiProperty({
    example: "[{ position: '1', type_: 'track', title: 'Intro', duration: '03:42' }]",
    description: 'Tracks',
  })
  tracklist: Array<Record<string, string>>;
}
