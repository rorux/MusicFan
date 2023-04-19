import { CoverImageProps } from './types';

export const CoverImage = ({ coverImage, title }: CoverImageProps): React.ReactElement => (
  <div className="mb-3">
    <img src={coverImage} alt={title} className="w-100" />
  </div>
);
