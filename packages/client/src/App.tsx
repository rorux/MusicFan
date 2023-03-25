import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './router/Router';

function App() {
  useEffect(() => {
    document.body.setAttribute('data-theme', 'light');
  }, []);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
