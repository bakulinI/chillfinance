import { Button, Flex, Form, Input, Typography } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const { Title, Link } = Typography;
export const SignIn: FC = () => {
  const navigate = useNavigate();
  return (
    <section className="h-screen bg-auth bg-cover bg-center">
      <div className="my-container h-full pt-24 ">
        <Form className="bg-white px-8 pt-8 rounded-3xl pb-11 mb-5 shadow-[0px_4px_4px_0px_#00000040]">
          <Title className="font-bold text-center" level={3}>
            Авторизация
          </Title>
          <Form.Item label="Имя пользователя" className="[&_.ant-form-item-label]:pb-0">
            <Input placeholder="Заполните это поле" className="border border-input" />
          </Form.Item>

          <Form.Item label="Пароль" className="[&_.ant-form-item-label]:pb-0">
            <Input.Password placeholder="Заполните это поле" className="border border-input" />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 2, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
          </Form.Item>
        </Form>
        <Flex justify="center" gap={9} align="center">
          <Link href="/signup" className="text-center text-white block">
            Еще нет аккаунта?
          </Link>
          <Button ghost onClick={() => navigate('/signup')} color="default" variant="outlined">
            Зарегистрироваться
          </Button>
        </Flex>
      </div>
    </section>
  );
};
