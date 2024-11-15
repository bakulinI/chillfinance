import { API } from '@/api';
import { useQuery } from '@tanstack/react-query';


export const useGetMe = () => {
  return useQuery({
    queryFn: API.getMe,
    queryKey: ['me'],
    select: ({ data }) => data,
  });
};
