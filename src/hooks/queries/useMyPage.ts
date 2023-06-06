import { useQuery } from '@tanstack/react-query';
import { getMyPostList, getMyBookMarkList, getMyFollowingUser } from 'apis/myPage';

export const useMyPostListQuery = (page: number, size: number, token: string) => {
  const data = useQuery(['getMyPostList', page], () => getMyPostList(page, size, token));
  return data;
};

export const useMyBookMarkListQuery = (page: number, size: number, token: string) => {
  const data = useQuery(['getMyBookMarkList', page], () => getMyBookMarkList(page, size, token));
  return data;
};

export const useMyFollowingUserListQuery = (token: string) => {
  const data = useQuery(['getMyFollowingUser'], () => getMyFollowingUser(token));
  return data;
};
