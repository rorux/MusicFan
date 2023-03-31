import { Route, Routes } from 'react-router-dom';
import { MainPage } from '@pages/main-page';
import { SignupPage } from '@pages/signup';
import { SigninPage } from '@pages/signin';
import { NotFoundPage } from '@pages/not-found-page';
import { ROUTES } from './routes';

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
