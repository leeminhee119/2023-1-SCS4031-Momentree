import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import GlobalStyle from './styles/globalStyle';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { lazy, Suspense } from 'react';
import { CookiesProvider } from 'react-cookie';

const MainPage = lazy(() => import('./pages/Main'));
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const SelectTags = lazy(() => import('./pages/SelectTags'));
const Post = lazy(() => import('./pages/Post'));
const Detail = lazy(() => import('./pages/Detail'));
const EditPost = lazy(() => import('./pages/EditPost'));
const MyBookmarkList = lazy(() => import('./pages/MyBookmarkList'));
const MyPostList = lazy(() => import('./pages/MyPostList'));
const PostsByTagPage = lazy(() => import('./pages/PostsByTagPage'));

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
    <CookiesProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <RecoilRoot>
              <GlobalStyle />
              <AppLayout>
                <Suspense fallback={<h1>로딩중입니다.</h1>}>
                  <Routes>
                    <Route path="/search/:tag" element={<PostsByTagPage />} />
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/selectTags" element={<SelectTags />} />
                    <Route path="/post" element={<Post />} />
                    <Route path="/post/:postId" element={<Detail />} />
                    <Route path="/post/:postId/edit" element={<EditPost />} />
                    <Route path="/userPage/myBookmarkList" element={<MyBookmarkList />}></Route>
                    <Route path="/userPage/myPostList" element={<MyPostList />}></Route>
                  </Routes>
                </Suspense>
              </AppLayout>
            </RecoilRoot>
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </CookiesProvider>
  );
}
