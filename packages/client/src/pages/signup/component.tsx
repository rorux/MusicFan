import { ReactElement } from 'react';
import { BsShieldFillExclamation, BsPersonBoundingBox, BsPersonSquare } from 'react-icons/bs';
import { cn, kebab } from '@bem';
import { Input } from '@components';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../router/routes';

const block = cn('signup');

export const SignupPage = (): ReactElement => {
  return (
    <div className="container">
      <div className={kebab(block('form', ['card mt-5 mx-auto rounded-0']))}>
        <div className={kebab(block('header', ['card-header h4 text-center text-uppercase']))}>
          <small>Регистрация</small>
        </div>
        <div className="card-body px-5 py-5">
          <div className="mb-4 ">
            <Input id="username" type="text" placeholder="Имя" icon={<BsPersonBoundingBox />} />
          </div>
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
            <Link to={ROUTES.SIGNIN}>Войти</Link>, если уже зарегистрированы
          </small>
        </div>
      </div>
    </div>
  );
};
