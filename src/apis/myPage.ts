import { GET } from 'apis/api';

export const getMyPostList = async (page: number, size: number, token: string) => {
  const { data } = await GET(`/myPage/myRecord?page=${page}&size=${size}`, token);
  return data;
};

export const getMyBookMarkList = async (page: number, size: number, token: string) => {
  const { data } = await GET(`/myPage/myBookmark?page=${page}&size=${size}`, token);
  return data;
};

export const getMyFollowingUser = async (token: string) => {
  const { data } = await GET(`/myPage/myFollow`, token);
  return data;
};
