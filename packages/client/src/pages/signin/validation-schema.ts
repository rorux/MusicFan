import * as Yup from 'yup';
import { validationRegexps } from '@utils';
import { FindUser } from '@features/auth';

export const initialSigninFormState: FindUser = {
  login: '',
  password: '',
};

const namespace = 'signin-page.validation';

export const signinValidationSchema = Yup.object().shape({
  login: Yup.string()
    .required(`${namespace}.login.empty`)
    .min(2, `${namespace}.login.min-length`)
    .max(20, `${namespace}.login.max-length`)
    .matches(validationRegexps.login, `${namespace}.login.matches`),
  password: Yup.string()
    .required(`${namespace}.password.empty`)
    .min(3, `${namespace}.password.min-length`)
    .max(20, `${namespace}.password.max-length`)
    .matches(validationRegexps.password, `${namespace}.password.matches`),
});
