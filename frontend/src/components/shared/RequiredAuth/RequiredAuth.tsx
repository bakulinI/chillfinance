import { Typography } from 'antd';
import React, { FC } from 'react';

const { Title } = Typography;

interface RequiredAuthProps {
  children: React.ReactNode;
}

const RequiredAuth: FC<RequiredAuthProps> = ({ children }) => {
  //   const { isAuth } = useAuth();
  const isAuth = true;
  return isAuth ? children : <Title type="danger">Authorized only!</Title>;
};

export default RequiredAuth;
