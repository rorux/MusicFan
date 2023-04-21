import { useTranslation } from 'react-i18next';
import { uniqueId } from 'lodash';
import { FavouritesItem } from './favourites-item';
import { Accordion, AccordionItem } from '@components';
import { FavouritesBlockProps } from './types';

export const FavouritesBlock = ({ favourites }: FavouritesBlockProps): React.ReactElement => {
  const { t } = useTranslation();
  const artists = Object.values(favourites);

  return (
    <div className="pb-4">
      <Accordion>
        {artists.map((artist) => (
          <AccordionItem
            key={artist.artist}
            header={<div className="h5 mb-0">{artist.artist ?? t('favourites-page.artist-not-specified')}</div>}
          >
            <FavouritesItem key={uniqueId('artist_')} artist={artist} />
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
