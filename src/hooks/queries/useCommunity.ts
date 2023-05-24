import { useQuery } from '@tanstack/react-query';
import { getCommunity } from 'apis/main';

export const useCommunityQuery = (page: number, size: number, token?: string) => {
  const data = useQuery(['getCommunity', page], () => getCommunity(page, size, token));
  return data;
};
