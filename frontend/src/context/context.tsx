import React, { createContext, FC, useEffect, useState } from 'react';

import { authApi } from '@/api';
import { useLocalStorage } from '@/common';

interface Context {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const context = createContext<Context>({} as Context);

interface ContextProviderProps {
  children: React.ReactNode;
}

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState(false);

  const { getItem, setItem } = useLocalStorage();
  const refreshToken = async () => {
    const response = await authApi.refreshToken();

    if (response.status === 200) {
      setAuth(true);
      setItem('token', response.data['access_token']);
    }
  };
  useEffect(() => {
    if (getItem('token')) {
      refreshToken();
    }
  }, []);
  return <context.Provider value={{ auth, setAuth }}>{children}</context.Provider>;
};
