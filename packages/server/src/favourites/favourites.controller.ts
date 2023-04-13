import { Body, Controller, Post, HttpCode, UseGuards, BadRequestException, Delete, Param } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { FavouritesService } from './favourites.service';
import { AddFavouriteDto } from './dto/add-favourite.dto';
import { Favourite } from './favourite.entity';

@ApiTags('Favourites')
@Controller('favourites')
export class FavouritesController {
  constructor(private favouritesService: FavouritesService) {}

  @ApiOperation({ summary: 'Add favourite album' })
  @ApiResponse({ status: 201, type: Favourite })
  @UseGuards(AuthGuard)
  @HttpCode(201)
  @Post()
  async add(@Body() favouriteDto: AddFavouriteDto, @I18n() i18n: I18nContext): Promise<Favourite> {
    const favourite = await this.favouritesService.getFavouriteByUserIdAndAlbumId(
      favouriteDto.userId,
      favouriteDto.albumId,
    );

    if (favourite) {
      throw new BadRequestException(i18n.t('errors.album-already-favourite'));
    }

    const newFavourite = await this.favouritesService.addFavourite(favouriteDto);
    return newFavourite;
  }
}
