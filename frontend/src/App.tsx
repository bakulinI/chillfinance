import { ContextProvider } from '@/context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, message } from 'antd';
import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RequiredAuth from './components/shared/RequiredAuth/RequiredAuth';
import { HomePage, SignInPage, SignUpPage } from './pages';
import LayoutPage from './pages/Layout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      {
        path: '/',
        element: (
          <RequiredAuth>
            <HomePage />
          </RequiredAuth>
        ),
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
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: '"Inter",sans-serif',
            },
          }}
        >
          {contextHolder}
          <RouterProvider router={router} />
        </ConfigProvider>
      </ContextProvider>
    </QueryClientProvider>
  );
};

export default App;
