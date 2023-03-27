import { BrowserRouter } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { iconsStyles } from '@context';
import { Router } from '@router';

function App() {
  return (
    <BrowserRouter>
      <IconContext.Provider value={iconsStyles}>
        <Router />
      </IconContext.Provider>
    </BrowserRouter>
  );
}

export default App;
