import * as Yup from 'yup';
import { validationRegexps } from '@utils';
import { FindUser } from './types';

export const initialSigninFormState: FindUser = {
  login: '',
  password: '',
};

export const signinValidationSchema = Yup.object().shape({
  login: Yup.string()
    .required('Введите, пожалуйста, логин!')
    .min(2, 'Слишком короткий логин!')
    .max(20, 'Слишком длинный логин!')
    .matches(validationRegexps.login, 'Латиница и цифры, может содержать "-" и "_"'),
  password: Yup.string()
    .required('Введите, пожалуйста, пароль!')
    .min(3, 'Пароль от 3 символов!')
    .max(20, 'Пароль не более 20 символов!')
    .matches(validationRegexps.password, 'Латиница, кириллица, цифры, спецсимволы: "!?&/|^#_-"'),
});
