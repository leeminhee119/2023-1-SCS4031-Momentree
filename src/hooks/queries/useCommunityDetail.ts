import { useQuery, useMutation } from '@tanstack/react-query';
import { getCommunityDetail, deleteCommunityDetail } from 'apis/detail';

export const useCommunityDetailQuery = (postId: number, token?: string) => {
  const data = useQuery([getCommunityDetail], () => getCommunityDetail(postId, token));
  return data;
};

export const usedeleteCommunityDetail = (postId: number, token: string) => {
  return useMutation(() => deleteCommunityDetail(postId, token), {
    onError: (error) => {
      console.error(error);
    },
  });
};
