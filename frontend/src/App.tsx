import { ContextProvider } from '@/context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RequiredAuth from './components/shared/RequiredAuth/RequiredAuth';
import { HomePage, SignInPage, SignUpPage } from './pages';
import { CategoryPage } from './pages/Category';
import LayoutPage from './pages/Layout';
import { ProfilePage } from './pages/Profile';

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
        element: <HomePage />,
      },
      {
        path: '/signup',
        element: <SignUpPage />,
      },
      {
        path: '/category',
        element: <CategoryPage />,
      },
      {
        path: '/profile',
        element: (
          <RequiredAuth>
            <ProfilePage />
          </RequiredAuth>
        ),
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
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: '"Inter",sans-serif',
            },
          }}
        >
          <RouterProvider router={router} />
        </ConfigProvider>
      </ContextProvider>
    </QueryClientProvider>
  );
};

export default App;
