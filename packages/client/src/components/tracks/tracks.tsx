import { uniqueId } from 'lodash';
import { cn, kebab } from '@bem';
import { TracksProps } from './types';

const block = cn('tracklist');

export const Tracks = ({ tracklist, title, emptyLabel }: TracksProps): React.ReactElement =>
  tracklist.length > 0 ? (
    <div className={kebab(block())}>
      <div className={kebab(block('label', ['ms-3 mb-2']))}>{title}</div>
      <ol>
        {tracklist.map((track) => (
          <li key={uniqueId('track_')}>
            {track.title} {track.duration ? `(${track.duration})` : ''}
          </li>
        ))}
      </ol>
    </div>
  ) : (
    <p className="text-center">{emptyLabel}</p>
  );
