import { useQuery } from '@tanstack/react-query';
import { getCommunity } from 'apis/main';

export const useCommunityQuery = () => {
  const data = useQuery([getCommunity], () => getCommunity());
  return data;
};
