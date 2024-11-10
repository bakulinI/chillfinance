import { API } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { message } from 'antd';
import { AxiosError } from 'axios';

export const useGetCategory = () => {
  return useQuery({
    queryFn: API.getCategories,
    queryKey: ['category'],
    onError: (error: AxiosError<Record<string, string | string[]>>) => {
      console.log(error);
      message.error(error.message);
    },
    select: ({ data }) => data,
  });
};
