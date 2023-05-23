import { useQuery } from '@tanstack/react-query';
import { getRecommendList } from 'apis/main';

export const useRecommendQuery = (token: string) => {
  const data = useQuery([getRecommendList], () => getRecommendList(token));
  return data;
};
