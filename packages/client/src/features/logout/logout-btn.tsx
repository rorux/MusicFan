import { useTranslation } from 'react-i18next';
import { BsArrowRightShort } from 'react-icons/bs';
import { cn, kebab } from '@bem';
import { useAppDispatch } from '@store';
import { logout } from '@features/auth';

const block = cn('auth-btn');

export const LogoutBtn = (): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <span className={kebab(block(undefined, ['rounded-0']))} onClick={() => dispatch(logout())}>
      <span className={kebab(block('label', ['text-uppercase d-none d-sm-block']))}>
        <small>{t('logout')}</small>
      </span>
      <BsArrowRightShort />
    </span>
  );
};
