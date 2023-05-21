import { useQuery } from '@tanstack/react-query';
import { getCommunity } from 'apis/main';

export const useCommunityQuery = (token?: string) => {
  const data = useQuery(['getCommunity'], () => getCommunity(token));
  return data;
};
