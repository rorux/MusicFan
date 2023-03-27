import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { BsShieldFillExclamation, BsPersonSquare } from 'react-icons/bs';
import { Formik } from 'formik';
import { ROUTES } from '@router';
import { cn, kebab } from '@bem';
import { Input } from '@components';
import { initialSigninFormState, signinValidationSchema } from './validation-schema';
import { FindUser } from './types';

const block = cn('signup');

export const SigninPage = (): ReactElement => {
  return (
    <div className="container h-100 d-flex">
      <div className={kebab(block('form', ['card m-auto rounded-0']))}>
        <div className={kebab(block('header', ['card-header h4 text-center text-uppercase']))}>
          <small>Авторизация</small>
        </div>
        <div className="card-body px-5 py-5">
          <Formik
            initialValues={{ ...initialSigninFormState }}
            validationSchema={signinValidationSchema}
            onSubmit={(formData: FindUser) => console.log(formData)}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <form noValidate onSubmit={handleSubmit}>
                <div className="mb-4 ">
                  <Input
                    type="text"
                    name="login"
                    value={values.login}
                    onChange={handleChange}
                    isInvalid={!!errors.login}
                    invalidFeedback={errors.login}
                    placeholder="Логин"
                    icon={<BsPersonSquare />}
                  />
                </div>
                <div className="mb-4 ">
                  <Input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    invalidFeedback={errors.password}
                    placeholder="Пароль"
                    icon={<BsShieldFillExclamation />}
                  />
                </div>
                <div className=" text-center">
                  <button type="submit" className="btn btn-outline-green w-100 rounded-0 text-uppercase">
                    <small>Отправить</small>
                  </button>
                </div>
              </form>
            )}
          </Formik>
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