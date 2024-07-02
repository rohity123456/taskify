'use client';
import React from 'react';
import StoreProvider from './StoreProvider';
import { ThemeProvider } from './ThemeProvider';
import { SessionProvider } from 'next-auth/react';

interface ProviderProps {
  children: React.ReactNode;
}
const Providers: React.FC<ProviderProps> = ({ children }) => {
  return (
    <>
      <SessionProvider>
        <ThemeProvider defaultTheme='system'>
          <StoreProvider>{children}</StoreProvider>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
};

export default Providers;
