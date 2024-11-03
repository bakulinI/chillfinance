import { Button, Flex, Form, Input, Typography } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
const { Title, Link } = Typography;
export const SignUp: FC = () => {
  const navigate = useNavigate();

  return (
    <section className="h-screen bg-auth bg-cover bg-center">
      <div className="my-container h-full pt-24">
        <Form className="bg-white px-8 pt-8 rounded-3xl pb-11 mb-8 shadow-[0px_4px_4px_0px_#00000040]">
          <Title className="font-bold text-center" level={3}>
            Регистрация
          </Title>
          <Form.Item label="Имя пользователя" className="[&_.ant-form-item-label]:pb-0">
            <Input placeholder="Заполните это поле" className="border border-input" />
          </Form.Item>
          <Form.Item label="Электронная почта" className="[&_.ant-form-item-label]:pb-0">
            <Input placeholder="Заполните это поле" className="border border-input" />
          </Form.Item>
          <Form.Item label="Пароль" className="[&_.ant-form-item-label]:pb-0">
            <Input.Password placeholder="Заполните это поле" className="border border-input" />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 1, offset: 4 }}>
            <Button type="primary" htmlType="submit">
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
        <Flex justify="center" gap={9} align="center">
          <Link href="/signin" className="text-center text-white block">
            Уже есть аккаунт?
          </Link>
          <Button ghost onClick={() => navigate('/signin')} color="default" variant="outlined">
            Войти
          </Button>
        </Flex>
      </div>
    </section>
  );
};
