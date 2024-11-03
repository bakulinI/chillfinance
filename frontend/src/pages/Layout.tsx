import { Layout } from '@/components/Layout';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const LayoutPage: FC = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
export default LayoutPage;
