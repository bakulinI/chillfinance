import { api } from '@/api';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Empty, Flex, Modal, Typography } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddedBankCards } from '../AddedBankCards';
import BankCards from '../BankCards/BankCards';
import { useGetBanks } from './hooks/useGetBanks';
const { Title, Link } = Typography;
const { Meta } = Card;

export const Profile: FC = () => {
  const [visible, setVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      const response = await api.get('/users/');
      console.log(response.data);
    };
    getData();
  }, []);

  const { data, isLoading } = useGetBanks();
  console.log(data);

  return (
    <div className="my-container">
      <Title className="text-white text-center pt-3">Профиль</Title>
      {data?.length > 0 ? (
        <>
          <Button
            iconPosition="end"
            className="backg-[linear-gradient(135deg_#6253e1_#04befe)] mb-4"
            icon={<PlusOutlined size={64} />}
            type="primary"
            onClick={showModal}
          >
            Добавить банк
          </Button>
          <Title className="text-white" level={4}>
            Ваши банки
          </Title>
          <Flex vertical gap={10} className="text-white">
            {data && data.map((el) => <AddedBankCards {...el} />)}
          </Flex>
        </>
      ) : (
        <Empty className="bg-white rounded-md p-4" description="no data">
          <Button
            iconPosition="end"
            className="backg-[linear-gradient(135deg_#6253e1_#04befe)]"
            icon={<PlusOutlined size={64} />}
            type="primary"
            onClick={showModal}
          >
            Добавьте свой первый банк!
          </Button>
        </Empty>
      )}
      <Modal
        loading={isLoading}
        title="Выбор Банков"
        cancelText="Закрыть"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Flex vertical gap={10}>
          {data && data.map((el) => <BankCards {...el} />)}
        </Flex>
      </Modal>
    </div>
  );
};
