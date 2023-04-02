import { Link } from 'react-router-dom';
import { cn, kebab } from '@bem';
import { ROUTES } from '@router';

const block = cn('logo');

export const Logo = (): React.ReactElement => {
  return (
    <Link to={ROUTES.MAIN} className={kebab(block(undefined, ['h4 mb-0']))}>
      <span className={kebab(block('first-word'))}>Music</span>
      <span className={kebab(block('second-word'))}>Fan</span>
    </Link>
  );
};
