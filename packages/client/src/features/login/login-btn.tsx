import { BsArrowLeftShort } from 'react-icons/bs';
import { cn, kebab } from '@bem';
import { Link } from 'react-router-dom';
import { ROUTES } from '@router';

const block = cn('login-btn');

export const LoginBtn = () => {
  return (
    <Link to={ROUTES.SIGNIN}>
      <span className={kebab(block(undefined, ['rounded-0']))}>
        <BsArrowLeftShort />
      </span>
    </Link>
  );
};
