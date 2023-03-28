import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BsShieldFillExclamation, BsPersonBoundingBox, BsPersonSquare } from 'react-icons/bs';
import { Formik } from 'formik';
import { cn, kebab } from '@bem';
import { Header } from '@widgets';
import { Input } from '@components';
import { ROUTES } from '@router';
import { initialSignupFormState, signupValidationSchema } from './validation-schema';
import { CreateUser } from './types';

const block = cn('signup');
const namespace = 'signup-page';

export const SignupPage = (): ReactElement => {
  const { t } = useTranslation();

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
              initialValues={{ ...initialSignupFormState }}
              validationSchema={signupValidationSchema}
              onSubmit={(formData: CreateUser) => console.log(formData)}
            >
              {({ handleSubmit, handleChange, values, errors }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <div className="mb-4 ">
                    <Input
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                      invalidFeedback={errors.name}
                      placeholder={t(`${namespace}.name-label`)}
                      icon={<BsPersonBoundingBox />}
                    />
                  </div>
                  <div className="mb-4 ">
                    <Input
                      type="text"
                      name="login"
                      value={values.login}
                      onChange={handleChange}
                      isInvalid={!!errors.login}
                      invalidFeedback={errors.login}
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
                      invalidFeedback={errors.password}
                      placeholder={t(`${namespace}.password-label`)}
                      icon={<BsShieldFillExclamation />}
                    />
                  </div>
                  <div className=" text-center">
                    <button type="submit" className="btn btn-outline-green w-100 rounded-0 text-uppercase">
                      <small>{t(`${namespace}.submit-form`)}</small>
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
          <div className={kebab(block('footer', ['card-footer text-center']))}>
            <small>
              <Link to={ROUTES.SIGNIN}>{t(`${namespace}.enter`)}</Link>
              {t(`${namespace}.already-registered`)}
            </small>
          </div>
        </div>
      </div>
    </>
  );
};
