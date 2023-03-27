import { cn, kebab } from '@bem';
import { useEffect, useState } from 'react';

const block = cn('theme-switcher');

export const ThemeSwitcher = () => {
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    document.body.setAttribute('data-theme', checked ? 'dark' : 'light');
  }, [checked]);

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
