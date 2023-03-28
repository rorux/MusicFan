import { useState } from 'react';
import { cn, kebab } from '@bem';
import i18n from '../../../../resources/i18n';
import { mappedFlagIcons } from './mapped-flag-icons';

const block = cn('lang-switcher');

export const LangSwitcher = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(
    (localStorage.getItem('i18nextLng') ?? 'ru') as keyof typeof mappedFlagIcons,
  );

  const switchLocale = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedLanguage(event.target.value as keyof typeof mappedFlagIcons);
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className={kebab(block(undefined, ['ps-1']))}>
      {mappedFlagIcons[selectedLanguage]}
      <select className={kebab(block('select'))} defaultValue={selectedLanguage} onChange={switchLocale}>
        <option value="ru">RU</option>
        <option value="en">EN</option>
      </select>
    </div>
  );
};
