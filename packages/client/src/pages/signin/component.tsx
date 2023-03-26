import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { BsShieldFillExclamation, BsPersonSquare } from 'react-icons/bs';
import { ROUTES } from '@router';
import { cn, kebab } from '@bem';
import { Input } from '@components';

const block = cn('signup');

export const SigninPage = (): ReactElement => {
  return (
    <div className="container h-100 d-flex">
      <div className={kebab(block('form', ['card m-auto rounded-0']))}>
        <div className={kebab(block('header', ['card-header h4 text-center text-uppercase']))}>
          <small>Авторизация</small>
        </div>
        <div className="card-body px-5 py-5">
          <div className="mb-4 ">
            <Input id="login" type="text" placeholder="Логин" icon={<BsPersonSquare />} />
          </div>
          <div className="mb-4 ">
            <Input id="password" type="password" placeholder="Пароль" icon={<BsShieldFillExclamation />} />
          </div>
          <div className=" text-center">
            <button type="button" className="btn btn-outline-green w-100 rounded-0 text-uppercase">
              <small>Отправить</small>
            </button>
          </div>
        </div>
        <div className={kebab(block('footer', ['card-footer text-center']))}>
          <small>
            <Link to={ROUTES.SIGNUP}>Зарегистрироваться</Link>, если еще нет аккаунта
          </small>
        </div>
      </div>
    </div>
  );
};
