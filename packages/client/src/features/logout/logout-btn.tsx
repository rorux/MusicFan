import { useTranslation } from 'react-i18next';
import { BsArrowRightShort } from 'react-icons/bs';
import { cn, kebab } from '@bem';
import { useAppDispatch } from '@store';
import { logout } from '@features/auth';

const block = cn('logout-btn');

export const LogoutBtn = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <span className={kebab(block(undefined, ['rounded-0']))} onClick={() => dispatch(logout())}>
      {t('logout')} <BsArrowRightShort />
    </span>
  );
};
