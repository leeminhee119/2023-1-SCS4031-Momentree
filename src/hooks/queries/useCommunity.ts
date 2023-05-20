import { useQuery } from '@tanstack/react-query';
import { getCommunity, getLoginCommunity } from 'apis/main';

export const useCommunityQuery = () => {
  const data = useQuery([getCommunity], () => getCommunity());
  return data;
};

export const useLoginCommunityQuery = (token: string) => {
  const data = useQuery([getLoginCommunity], () => getLoginCommunity(token));
  return data;
};
