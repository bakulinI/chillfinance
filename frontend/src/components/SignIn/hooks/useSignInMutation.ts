import { authApi } from '@/api';
import { useAuth, useLocalStorage } from '@/common';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { AxiosError } from 'axios';

export const useSignInMutation = () => {
  const { setItem } = useLocalStorage();
  const { setAuth } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
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
