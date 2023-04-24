import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import GlobalStyle from './styles/globalStyle';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { lazy, Suspense } from 'react';

const MainPage = lazy(() => import('./pages/Main'));
const SelectTags = lazy(() => import('./pages/SelectTags'));
const Detail = lazy(() => import('./pages/Detail'));

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
    const vh = window.innerHeight * 0.01;
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
              <Suspense fallback={<h1>로딩중입니다.</h1>}>
                <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/selectTags" element={<SelectTags />} />
                  <Route path="/post/:postId" element={<Detail />} />
                </Routes>
              </Suspense>
            </AppLayout>
          </RecoilRoot>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
