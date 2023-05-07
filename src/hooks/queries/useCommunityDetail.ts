import { useQuery } from '@tanstack/react-query';
import { getCommunityDetail } from 'apis/detail';

export const useCommunityDetailQuery = (postId: number) => {
  const data = useQuery([getCommunityDetail], () => getCommunityDetail(postId));
  return data;
};
