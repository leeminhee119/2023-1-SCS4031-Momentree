import { useQuery } from '@tanstack/react-query';
import { getCommunity } from 'apis/main';
import { getHashtagPost } from 'apis/hashtagPost';

export const useCommunityQuery = (page: number, size: number, filter: string, token?: string) => {
  const data = useQuery(['getCommunity', page, filter], () => getCommunity(page, size, filter, token));
  return data;
};

export const useHashtagPostQuery = (tagName: string) => {
  const data = useQuery(['getHashtagPost', tagName], () => getHashtagPost(tagName), { enabled: !!tagName });
  return data;
};
