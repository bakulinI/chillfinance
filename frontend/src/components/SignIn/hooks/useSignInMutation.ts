import { authApi } from '@/api';
import { useAuth, useLocalStorage } from '@/common';
import { OutletContext } from '@/pages';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { AxiosError } from 'axios';
import { useOutletContext } from 'react-router-dom';

export const useSignInMutation = () => {
  const { setItem } = useLocalStorage();
  const { setAuth } = useAuth();
  const { messageApi } = useOutletContext<OutletContext>();
  return useMutation({
    mutationFn: authApi.signIn,
    onError: (error: AxiosError<Record<string, string | string[]>>) => {
      console.log(error);
      message.error(error.message);
    },
    onSuccess: (data) => {
      messageApi.success('Вы успешно вошли!');
      setItem('token', data.data['access_token']);
      setAuth(true);
    },
  });
};
