import { API } from '@/api';
import { useAuth, useLocalStorage } from '@/common';
import { useQuery } from '@tanstack/react-query';
import { message } from 'antd';
import { AxiosError } from 'axios';

export const useGetBanks = () => {
  const { setItem } = useLocalStorage();
  const { setAuth } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
  return useQuery({
    queryFn: API.getBanks,
    queryKey: ['banks'],
    onError: (error: AxiosError<Record<string, string | string[]>>) => {
      console.log(error);
      message.error(error.message);
    },
    select: ({ data }) => data,
  });
};
