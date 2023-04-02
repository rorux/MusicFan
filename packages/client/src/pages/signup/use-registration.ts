import { useAppDispatch, useAppSelector } from '@store';
import { toast } from 'react-toastify';
import { cleanAuthState, CreateUser, register } from '@features/auth';
import { FormikHelpers } from 'formik';

type UseRegistration = {
  loading: boolean;
  isAuth: boolean;
  handleSubmit: (values: CreateUser, actions: FormikHelpers<any>) => void;
};

const successActionType = '@@auth/signup/fulfilled';

export const useRegistration = (successRegistrationText: string): UseRegistration => {
  const dispatch = useAppDispatch();
  const { error, loading, isAuth } = useAppSelector((state) => state.auth);

  if (error) {
    toast.error(error);
    dispatch(cleanAuthState());
  }

  const handleSubmit = async (values: CreateUser, actions: FormikHelpers<any>) => {
    const user = await dispatch(register(values));
    actions.setFieldValue('login', '', false);
    if (user.type === successActionType) toast.success(successRegistrationText);
  };

  return { loading, isAuth, handleSubmit };
};
