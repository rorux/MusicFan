import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, Flip } from 'react-toastify';
import { IconContext } from 'react-icons';
import { iconsStyles } from '@context';
import { Router } from '@router';
import { Spinner } from '@components';
import { useAppLoading, useAppTheme, useCheckAuth, useFavourites } from '@hooks';

function App() {
  const appLoading = useAppLoading();
  const { isAuth } = useCheckAuth();
  useFavourites(isAuth);
  useAppTheme();

  return (
    <>
      <BrowserRouter>
        <IconContext.Provider value={iconsStyles}>{appLoading ? <Spinner /> : <Router />}</IconContext.Provider>
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
