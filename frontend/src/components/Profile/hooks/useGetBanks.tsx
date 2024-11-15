import { API } from '@/api';
import { OutletContext } from '@/pages';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useOutletContext } from 'react-router-dom';

export const useGetBanks = () => {
  const { messageApi } = useOutletContext<OutletContext>();
  return useQuery({
    queryFn: API.getBanks,
    queryKey: ['banks'],
    onError: (error: AxiosError<Record<string, string | string[]>>) => {
      console.log(error);
      messageApi.error(error.message);
    },
    select: ({ data }) => data,
  });
};
