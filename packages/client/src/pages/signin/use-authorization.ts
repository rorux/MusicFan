import { useAppDispatch, useAppSelector } from '@store';
import { toast } from 'react-toastify';
import { authorize, cleanAuthState, FindUser } from '@features/auth';
import { FormikHelpers } from 'formik';

type UseAuthorization = {
  loading: boolean;
  isAuth: boolean;
  handleSubmit: (values: FindUser, actions: FormikHelpers<any>) => void;
};

export const useAuthorization = (): UseAuthorization => {
  const dispatch = useAppDispatch();
  const { error, loading, isAuth } = useAppSelector((state) => state.auth);

  if (error) {
    toast.error(error);
    dispatch(cleanAuthState());
  }

  const handleSubmit = async (values: FindUser, actions: FormikHelpers<any>) => {
    await dispatch(authorize(values));
    actions.setFieldValue('login', '', false);
    actions.setFieldValue('password', '', false);
  };

  return { loading, isAuth, handleSubmit };
};
