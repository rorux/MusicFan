import { cn, kebab } from '@bem';
import { ThemeSwitcher } from '@features/theme';
import { LangSwitcher } from '@features/lang';
import { LogoutBtn } from '@features/logout';
import { useAppSelector } from '@store';

const block = cn('header-block');

export const Header = () => {
  const { isAuth } = useAppSelector((state) => state.auth);

  return (
    <div className="position-fixed w-100">
      <ul className={kebab(block(undefined, ['nav container']))}>
        <li className="flex-grow-1"></li>
        <li className={kebab(block('item', ['nav-item']))}>
          <LangSwitcher />
        </li>
        <li className={kebab(block('item', ['nav-item']))}>
          <ThemeSwitcher />
        </li>
        {isAuth && (
          <li className={kebab(block('item', ['nav-item']))}>
            <LogoutBtn />
          </li>
        )}
      </ul>
    </div>
  );
};
