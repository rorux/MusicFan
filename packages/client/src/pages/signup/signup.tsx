import { Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BsShieldFillExclamation, BsPersonBoundingBox, BsPersonSquare } from 'react-icons/bs';
import { Formik } from 'formik';
import { cn, kebab } from '@bem';
import { Header } from '@widgets/header';
import { ROUTES } from '@router';
import { Button, FormikInput } from '@components';
import { initialSignupFormState, signupValidationSchema } from './validation-schema';
import { useRegistration } from './use-registration';

const block = cn('signup');
const namespace = 'signup-page';

export const SignupPage = (): React.ReactElement => {
  const { t } = useTranslation();
  const { loading, isAuth, handleSubmit } = useRegistration(t(`${namespace}.registration-completed`));

  if (isAuth) {
    return <Navigate to={ROUTES.MAIN} />;
  }

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
              onSubmit={handleSubmit}
            >
              {({ handleSubmit, handleChange, values, errors }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <div className="mb-4 ">
                    <FormikInput
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                      invalidFeedback={t(errors.name as string)}
                      placeholder={t(`${namespace}.name-label`)}
                      icon={<BsPersonBoundingBox />}
                    />
                  </div>
                  <div className="mb-4 ">
                    <FormikInput
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
                    <FormikInput
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
                  <Button loading={loading} label={t(`${namespace}.submit-form`)} />
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
