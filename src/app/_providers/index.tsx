import React from 'react';
import StoreProvider from './StoreProvider';
import { ThemeProvider } from './ThemeProvider';

interface ProviderProps {
  children: React.ReactNode;
}
const Providers: React.FC<ProviderProps> = ({ children }) => {
  return (
    <>
      <ThemeProvider defaultTheme='system'>
        <StoreProvider>{children}</StoreProvider>
      </ThemeProvider>
    </>
  );
};

export default Providers;
