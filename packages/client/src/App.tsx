import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, Flip } from 'react-toastify';
import { IconContext } from 'react-icons';
import { useAppDispatch, useAppSelector } from '@store';
import { iconsStyles } from '@context';
import { Router } from '@router';
import { checkAuth } from '@features/auth';
import { Spinner } from '@components/spinner';

function App() {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [show]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <IconContext.Provider value={iconsStyles}>{!show || loading ? <Spinner /> : <Router />}</IconContext.Provider>
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
