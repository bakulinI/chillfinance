import React, { createContext, FC, useEffect, useMemo, useState } from 'react';

import { authApi } from '@/api';
import { ME, useGetMe, useLocalStorage } from '@/common';
import { useQueryClient } from '@tanstack/react-query';
import { User } from '@/common/types';

interface Context {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  user: User
}

export const context = createContext<Context>({} as Context);

interface ContextProviderProps {
  children: React.ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState(false);

  const {  data } = useGetMe();
  const queryClient = useQueryClient();
  const user = useMemo(() => {
    return data;
  }, [data]);
  const { getItem, setItem } = useLocalStorage();
  const refreshToken = async () => {
    const response = await authApi.refreshToken();

    if (response.status === 200) {
      setAuth(true);
      setItem('token', response.data['access_token']);
      queryClient.invalidateQueries([ME]);
    }
  };

  useEffect(() => {
    if (getItem('token')) {
      refreshToken();
    }
  }, []);
  return <context.Provider value={{ auth, setAuth, user }}>{children}</context.Provider>;
};
