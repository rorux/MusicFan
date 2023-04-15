export type Track = {
  position: string;
  type: string;
  title: string;
  duration?: string;
};

export type Video = {
  uri: string;
  title: string;
  description: string;
  duration: number;
  embed: boolean;
};

export type ArtistDetails = {
  name: string;
  id: number;
  resourceUrl: string;
};

export type AlbumDetails = {
  id: number;
  title: string;
  artists: Array<ArtistDetails>;
  styles: Array<string>;
  tracklist: Array<Track>;
  videos: Array<Video>;
  year: number;
};

export type AlbumState = {
  data: AlbumDetails | null;
  loading: boolean;
  error: string | null | undefined;
};
