import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, Flip } from 'react-toastify';
import { IconContext } from 'react-icons';
import { iconsStyles } from '@context';
import { Router } from '@router';

function App() {
  return (
    <>
      <BrowserRouter>
        <IconContext.Provider value={iconsStyles}>
          <Router />
        </IconContext.Provider>
      </BrowserRouter>
      <ToastContainer
        transition={Flip}
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        icon={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
