import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favourite } from './favourite.entity';
import { AddFavouriteDto } from './dto/add-favourite.dto';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class FavouritesService {
  constructor(@InjectRepository(Favourite) private readonly favouritesRepository: Repository<Favourite>) {}

  async addFavourite(dto: AddFavouriteDto): Promise<Favourite> {
    const newFavourite = await this.favouritesRepository.create(dto);
    await this.favouritesRepository.save(newFavourite);
    return newFavourite;
  }

  async removeFavourite(userId: number, albumId: number, i18n: I18nContext): Promise<number> {
    const deletedFavourite = await this.favouritesRepository.delete({ userId, albumId });
    if (!deletedFavourite.affected) {
      throw new HttpException(i18n.t('errors.not-found'), HttpStatus.NOT_FOUND);
    }
    return albumId;
  }

  async getFavouriteByUserIdAndAlbumId(userId: number, albumId: number): Promise<Favourite> {
    const favourite = await this.favouritesRepository.findOne({ where: { userId, albumId } });
    return favourite;
  }

  async getFavouritesByUserId(userId: number): Promise<Favourite[]> {
    const favourites = await this.favouritesRepository.find({ where: { userId } });

    if (favourites) {
      return favourites;
    }

    return null;
  }
}
