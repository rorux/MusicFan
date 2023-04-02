import { cn, kebab } from '@bem';
import { ThemeSwitcher } from '@features/theme';
import { LangSwitcher } from '@features/lang';

const block = cn('header-block');

export const Header = () => {
  return (
    <div className="position-fixed w-100">
      <ul className={kebab(block(undefined, ['nav container']))}>
        <li className="flex-grow-1"></li>
        <li className="nav-item">
          <LangSwitcher />
        </li>
        <li className="nav-item">
          <ThemeSwitcher />
        </li>
      </ul>
    </div>
  );
};
