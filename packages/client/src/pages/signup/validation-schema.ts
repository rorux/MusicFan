import * as Yup from 'yup';
import { validationRegexps } from '@utils';
import { CreateUser } from './types';

export const initialSignupFormState: CreateUser = {
  name: '',
  login: '',
  password: '',
};

const namespace = 'signup-page.validation';

export const signupValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required(`${namespace}.name.empty`)
    .min(2, `${namespace}.name.min-length`)
    .max(20, `${namespace}.name.max-length`)
    .matches(validationRegexps.name, `${namespace}.name.matches`),
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
