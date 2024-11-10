import { api } from '@/api';
import { Button, Flex, Typography } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;
export const Home: FC = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      const response = await api.get('/users/');
      console.log(response.data);
    };
    getData();
  }, []);
  return (
    <div className="my-container">
      <Title className="text-white text-center pt-4" level={1}>
        Приветствуем в chillfinance
      </Title>

      <img
        onPointerOver={() => setVisible(true)}
        onPointerOut={() => setVisible(false)}
        src="/Logo.svg"
        alt="money"
        className="mb-4"
      />
      {visible && (
        <img src="https://i.pinimg.com/originals/ea/d5/c0/ead5c0ed4dd264f534f6b5d99b3321ad.gif" alt="money" />
      )}
      <Flex justify="center">
        <Button onClick={() => navigate('/profile')} color="default" variant="outlined">
          Перейти в профиль
        </Button>
      </Flex>
    </div>
  );
};
