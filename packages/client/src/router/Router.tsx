import { Route, Routes } from 'react-router-dom';
import { ROUTES } from './routes';
import { MainPage, NotFoundPage, SigninPage, SignupPage } from '@pages';

export const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.MAIN} element={<MainPage />} />
      <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
      <Route path={ROUTES.SIGNIN} element={<SigninPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
