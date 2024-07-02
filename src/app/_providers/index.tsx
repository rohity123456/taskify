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
        <StoreProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </StoreProvider>
      </SessionProvider>
    </>
  );
};

export default Providers;
