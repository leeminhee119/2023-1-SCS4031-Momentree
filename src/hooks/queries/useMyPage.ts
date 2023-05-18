import { useQuery } from '@tanstack/react-query';
import { getMyPostList } from 'apis/myPage';

export const useMyPostListQuery = (token: string) => {
  const data = useQuery([getMyPostList], () => getMyPostList(token));
  return data;
};
