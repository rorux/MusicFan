import { cn, kebab } from '@bem';
import { AlbumDetailsProps } from './types';

const block = cn('details');

export const AlbumDetails = ({
  country,
  styles,
  formats,
  countryLabel,
  styleLabel,
  formatLabel,
}: AlbumDetailsProps): React.ReactElement => {
  return (
    <div className={kebab(block())}>
      <div className={kebab(block('item'))}>
        <small>
          <span className={kebab(block('label'))}>{countryLabel}</span> – {country}
        </small>
      </div>
      <div className={kebab(block('item'))}>
        <small>
          <span className={kebab(block('label'))}>{styleLabel}</span> – {styles}
        </small>
      </div>
      <div className={kebab(block('item'))}>
        <small>
          <span className={kebab(block('label'))}>{formatLabel}</span> – {formats}
        </small>
      </div>
    </div>
  );
};
