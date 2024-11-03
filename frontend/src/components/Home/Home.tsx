import { api } from '@/api';
import { Typography } from 'antd';
import { FC, useEffect, useState } from 'react';
const { Title } = Typography;
export const Home: FC = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const response = await api.get('/users/');
      console.log(response.data);
    };
    getData();
  }, []);
  return (
    <div className="my-container">
      <Title className="text-white" level={1}>
        Приветствуем в chillfinance
      </Title>
      <img
        onPointerOver={() => setVisible(true)}
        onPointerOut={() => setVisible(false)}
        src="https://art.pixilart.com/00e0bfc5cefd3b0.gif"
        alt="money"
      />
      {visible && (
        <img src="https://i.pinimg.com/originals/ea/d5/c0/ead5c0ed4dd264f534f6b5d99b3321ad.gif" alt="money" />
      )}
    </div>
  );
};
