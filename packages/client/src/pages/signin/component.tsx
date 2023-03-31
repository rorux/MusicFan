import { ReactElement } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { BsShieldFillExclamation, BsPersonSquare } from 'react-icons/bs';
import { Formik, FormikHelpers } from 'formik';
import { cn, kebab } from '@bem';
import { Header } from '@widgets/header';
import { Input } from '@components/input';
import { ROUTES } from '@router';
import { authorize, cleanAuthState, FindUser } from '@features/auth';
import { useAppDispatch, useAppSelector } from '@store';
import { initialSigninFormState, signinValidationSchema } from './validation-schema';

const block = cn('signup');
const namespace = 'signin-page';

export const SigninPage = (): ReactElement => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { user, error, loading } = useAppSelector((state) => state.auth);

  if (error) {
    toast.error(error);
    dispatch(cleanAuthState());
  }

  if (user) {
    return <Navigate to={ROUTES.MAIN} />;
  }

  const handleSubmit = async (values: FindUser, actions: FormikHelpers<any>) => {
    await dispatch(authorize(values));
    actions.setFieldValue('login', '', false);
    actions.setFieldValue('password', '', false);
  };

  return (
    <>
      <Header />
      <div className="container h-100 d-flex">
        <div className={kebab(block('form', ['card m-auto rounded-0']))}>
          <div className={kebab(block('header', ['card-header h4 text-center text-uppercase']))}>
            <small>{t(`${namespace}.title`)}</small>
          </div>
          <div className="card-body px-5 py-5">
            <Formik
              initialValues={{ ...initialSigninFormState }}
              validationSchema={signinValidationSchema}
              onSubmit={handleSubmit}
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
                      invalidFeedback={t(errors.login as string)}
                      placeholder={t(`${namespace}.login-label`)}
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
                      invalidFeedback={t(errors.password as string)}
                      placeholder={t(`${namespace}.password-label`)}
                      icon={<BsShieldFillExclamation />}
                    />
                  </div>
                  <div className=" text-center">
                    <button
                      type="submit"
                      className="btn btn-outline-green w-100 rounded-0 text-uppercase d-flex justify-content-center align-items-center"
                    >
                      {loading && (
                        <span
                          className="spinner-grow me-1"
                          style={{ width: '0.7rem', height: '0.7rem' }}
                          role="status"
                          aria-hidden="true"
                        ></span>
                      )}
                      <small>{t(`${namespace}.submit-form`)}</small>
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
          <div className={kebab(block('footer', ['card-footer text-center']))}>
            <small>
              <Link to={ROUTES.SIGNUP}>{t(`${namespace}.register`)}</Link>
              {t(`${namespace}.no-account-yet`)}
            </small>
          </div>
        </div>
      </div>
    </>
  );
};
