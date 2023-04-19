import { Track } from '@features/album';

export type TracksProps = {
  tracklist: Track[];
  title: string;
  emptyLabel: string;
};
