import { Button, Card, Flex, Image, Popconfirm, PopconfirmProps } from 'antd';
import { FC } from 'react';
const { Meta } = Card;

interface Props {
  name: string;
  image_url: string;
}

export const BankCards: FC<Props> = ({ name, image_url }) => {
  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    console.log(e);
  };

  const cancel: PopconfirmProps['onCancel'] = (e) => {
    console.log(e);
  };
  return (
    <Card style={{ width: '100%' }}>
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

      <Popconfirm
        title={`Авторизация в банке ${name}`}
        description="Вы уверены,что хотите предоставить доступ приложение chillfinance?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Да"
        cancelText="Нет"
      >
        <Button type="primary">Добавить</Button>
      </Popconfirm>
    </Card>
  );
};
export default BankCards;
