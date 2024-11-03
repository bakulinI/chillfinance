import { useAuth } from '@/common';
import { Button, Flex, Typography } from 'antd';
import React, { FC } from 'react';

const { Title, Link } = Typography;

interface RequiredAuthProps {
  children: React.ReactNode;
}

const RequiredAuth: FC<RequiredAuthProps> = ({ children }) => {
  const { auth } = useAuth();
  return auth ? (
    children
  ) : (
    <Flex justify="center" gap={15} vertical align="center" className="pt-20">
      <Title className="text-center" level={3} type="danger">
        Только для авторизованных пользователей!
      </Title>
      <Button type="link" href="/signin">
        Войти
      </Button>
    </Flex>
  );
};

export default RequiredAuth;
