import { LangSwitcher } from './ui/lang-switcher';
import { ThemeSwitcher } from './ui/theme-switcher';
import { cn, kebab } from '@bem';

const block = cn('header-block');

export const Header = () => {
  return (
    <ul className={kebab(block(undefined, ['nav container position-fixed']))}>
      <li className="flex-grow-1"></li>
      <li className="nav-item">
        <LangSwitcher />
      </li>
      <li className="nav-item">
        <ThemeSwitcher />
      </li>
    </ul>
  );
};
