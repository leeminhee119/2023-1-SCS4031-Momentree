import { useQuery, useMutation } from '@tanstack/react-query';
import { getCommunityDetail, getLoginCommunityDetail, deleteCommunityDetail } from 'apis/detail';

export const useCommunityDetailQuery = (postId: number) => {
  const data = useQuery([getCommunityDetail], () => getCommunityDetail(postId));
  return data;
};

export const useLoginCommunityDetailQuery = (postId: number, token: string) => {
  const data = useQuery([getLoginCommunityDetail], () => getLoginCommunityDetail(postId, token));
  return data;
};

export const usedeleteCommunityDetail = (postId: number, token: string) => {
  return useMutation(() => deleteCommunityDetail(postId, token), {
    onError: (error) => {
      console.error(error);
    },
  });
};
