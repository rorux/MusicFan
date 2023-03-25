import { ReactElement, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './router/Router';

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
      <ThemeChangingBtn />
      <Router />
    </BrowserRouter>
  );
}

export default App;
