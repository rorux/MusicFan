import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  UseGuards,
  BadRequestException,
  Headers,
  Delete,
  Param,
} from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { FavouritesService } from './favourites.service';
import { TokensService } from '../tokens/tokens.service';
import { AddFavouriteDto } from './dto/add-favourite.dto';
import { Favourite } from './favourite.entity';

@ApiTags('Favourites')
@Controller('favourites')
export class FavouritesController {
  constructor(private favouritesService: FavouritesService, private tokensService: TokensService) {}

  @ApiOperation({ summary: 'Fetch favourite albums' })
  @ApiResponse({ status: 200, type: Favourite })
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Get()
  async fetch(@I18n() i18n: I18nContext, @Headers('Authorization') authHeader: string): Promise<Favourite[]> {
    const publicUser = this.tokensService.decodeAuthHeader(authHeader, i18n);
    const favourites = await this.favouritesService.getFavouritesByUserId(publicUser.id);

    return favourites;
  }

  @ApiOperation({ summary: 'Add favourite album' })
  @ApiResponse({ status: 201, type: Favourite })
  @UseGuards(AuthGuard)
  @HttpCode(201)
  @Post()
  async add(
    @Body() favouriteDto: AddFavouriteDto,
    @I18n() i18n: I18nContext,
    @Headers('Authorization') authHeader: string,
  ): Promise<Favourite> {
    const publicUser = this.tokensService.decodeAuthHeader(authHeader, i18n);
    const favourite = await this.favouritesService.getFavouriteByUserIdAndAlbumId(publicUser.id, favouriteDto.albumId);

    if (favourite) {
      throw new BadRequestException(i18n.t('errors.album-already-favourite'));
    }

    const newFavourite = await this.favouritesService.addFavourite({ ...favouriteDto, userId: publicUser.id });
    return newFavourite;
  }

  @ApiOperation({ summary: 'Remove favourite album' })
  @ApiResponse({ status: 200, type: Favourite })
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Delete(':albumId')
  async remove(
    @Param('albumId') albumId: string,
    @I18n() i18n: I18nContext,
    @Headers('Authorization') authHeader: string,
  ): Promise<number> {
    const publicUser = this.tokensService.decodeAuthHeader(authHeader, i18n);
    const removedAlbumId = await this.favouritesService.removeFavourite(publicUser.id, Number(albumId), i18n);
    return removedAlbumId;
  }
}
