import { useQuery } from '@tanstack/react-query';
import { getMyPostList } from 'apis/myPage';

export const useMyPostListQuery = (page: number, size: number, token: string) => {
  const data = useQuery(['getMyPostList', page], () => getMyPostList(page, size, token));
  return data;
};
