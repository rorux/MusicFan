import { ReactElement, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { Router } from './router/Router';
import { iconsStyles } from '@context';

const ThemeChangingBtn = (): ReactElement => {
  const [toggleTheme, setToggleTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.body.setAttribute('data-theme', toggleTheme);
  }, [toggleTheme]);

  return (
    <button className="d-block mx-auto" onClick={() => setToggleTheme(toggleTheme === 'dark' ? 'light' : 'dark')}>
      Изменить тему
    </button>
  );
};

function App() {
  return (
    <BrowserRouter>
      <IconContext.Provider value={iconsStyles}>
        <ThemeChangingBtn />
        <Router />
      </IconContext.Provider>
    </BrowserRouter>
  );
}

export default App;
