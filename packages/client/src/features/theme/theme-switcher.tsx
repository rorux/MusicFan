import { useState } from 'react';
import { cn, kebab } from '@bem';
import { useTheme } from '@features/theme/use-theme';
import { useAppSelector } from '@store';

const block = cn('theme-switcher');

export const ThemeSwitcher = (): React.ReactElement => {
  const theme = useAppSelector((state) => state.theme);
  const [checked, setChecked] = useState(theme === 'dark' ? true : false);
  useTheme({ checked });

  return (
    <div className={kebab(block())}>
      <label className={kebab(block('label'))} htmlFor="theme-btn">
        <input
          className={kebab(block('input'))}
          type="checkbox"
          id="theme-btn"
          defaultChecked={checked}
          onChange={() => setChecked(!checked)}
        />
        <div className="slider-wrapper">
          <div className="theme-btn-slider"></div>
          <span className="star star-1"></span>
          <span className="star star-2"></span>
          <span className="star star-3"></span>
          <span className="star star-4"></span>
          <span className="star star-5"></span>
          <span className="star star-6"></span>
        </div>
      </label>
    </div>
  );
};
