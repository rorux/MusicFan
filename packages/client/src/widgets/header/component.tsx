import { ThemeSwitcher } from './ui/theme-switcher';

export const Header = () => {
  return (
    <ul className="nav container position-fixed">
      <li className="flex-grow-1"></li>
      <li className="nav-item">
        <ThemeSwitcher />
      </li>
    </ul>
  );
};
