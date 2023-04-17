import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import GlobalStyle from './styles/globalStyle';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { lazy, Suspense } from 'react';

const MainPage = lazy(() => import('./pages/Main'));

import AppLayout from 'components/layout/AppLayout';

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
      },
    },
  });

  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <GlobalStyle />
            <AppLayout>
              <Routes>
                <Route path="/" element={<MainPage />}/>
              </Routes>
            </AppLayout>
          </RecoilRoot>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}