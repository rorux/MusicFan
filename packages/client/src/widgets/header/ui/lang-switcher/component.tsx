import { cn, kebab } from '@bem';

const block = cn('lang-switcher');

export const LangSwitcher = () => {
  return (
    <div className={kebab(block())}>
      <select className={kebab(block('select'))} defaultValue="ru" aria-label="Список языков">
        <option value="ru">RU</option>
        <option value="en">EN</option>
      </select>
    </div>
  );
};
