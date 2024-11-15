import { context } from '@/context';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Image, Modal, Tag, Typography } from 'antd';
import { FC, useContext, useState } from 'react';
import { useGetEntertainment } from './hooks';
const { Meta } = Card;

interface Props {
  name: string;
  image_url: string;
}

function randomInteger(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

const colors = ['green', 'red', 'volcano'];

const { Text } = Typography;
export const AddedBankCards: FC<Props> = ({ name, image_url }) => {
  const { isLoading, data } = useGetEntertainment();
  const { user } = useContext(context);
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
  return (
    <>
      <Card
        style={{ width: '100%' }}
        classNames={{
          body: 'p-3',
        }}
      >
        <Flex justify="space-between">
          <Meta title={name} className="mb-3" />
          <Image
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              padding: '.2em',
              borderRadius: '15px',
            }}
            width={100}
            height={100}
            src={image_url}
          />
        </Flex>
        <Flex vertical align="start" gap={15}>
          <Text className="bg-blue-500 text-white p-2 rounded-xl">Баланс {randomInteger(2000, 20000)} руб</Text>
          <Button iconPosition="end" icon={<ArrowRightOutlined />} type="primary" onClick={showModal}>
            Посмотреть развлечения
          </Button>
        </Flex>
      </Card>
      <Modal
        loading={isLoading}
        title="Просмотр развлечений"
        cancelText="Закрыть"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: 'none' } }}
      >
        <Flex vertical gap={10}>
          {data &&
            data
              .filter((el) => user.categories.includes(el.categories[0].name))
              .map((el) => (
                <Card style={{ width: '100%' }}>
                  <Flex vertical gap={10}>
                    <Meta title={el.title} description={el.description} className="mb-3" />
                    <Text className="bg-blue-500 text-white p-2 rounded-xl">{randomInteger(2000, 20000)} руб</Text>
                  </Flex>
                  <Text className="mb-2">Категории:</Text>
                  <Flex gap={10}>
                    {el.categories.map((cat) => (
                      <Tag color={colors[randomInteger(0, 2)]}>{cat.name}</Tag>
                    ))}
                  </Flex>
                </Card>
              ))}
          {/* {data && data.map((el) => <BankCards {...el} />)} */}
        </Flex>
      </Modal>
    </>
  );
};
