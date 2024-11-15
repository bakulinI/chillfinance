import { API } from '@/api';
import { ME } from '@/common';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { AxiosError } from 'axios';

export const useMutateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: API.updateCategories,
    onError: (error: AxiosError<Record<string, string | string[]>>) => {
      console.log(error);
      message.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([ME]);
    },
  });
};
