import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favourite } from './favourite.entity';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { TokensModule } from '../tokens/tokens.module';

@Module({
  imports: [TypeOrmModule.forFeature([Favourite]), forwardRef(() => TokensModule)],
  exports: [FavouritesService],
  providers: [FavouritesService],
  controllers: [FavouritesController],
})
export class FavouritesModule {}
