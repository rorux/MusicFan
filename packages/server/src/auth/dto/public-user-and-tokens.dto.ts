import { TokensDto } from '../../tokens/dto/tokens.dto';
import { PublicUserDto } from '../../users/dto/public-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PublicUserAndTokensDto extends TokensDto {
  @ApiProperty()
  user: PublicUserDto;
}
