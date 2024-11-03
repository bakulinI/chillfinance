import { ConfigProvider } from 'antd';
import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage, SignInPage, SignUpPage } from './pages';
import LayoutPage from './pages/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/signup',
        element: <SignUpPage />,
      },
      {
        path: '/signin',
        element: <SignInPage />,
      },
    ],
  },
]);

const App: FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: '"Inter",sans-serif',
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;
