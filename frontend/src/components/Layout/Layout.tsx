import React, { FC } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return <main>{children}</main>;
};
