/* eslint-disable @typescript-eslint/no-floating-promises */
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { postBookmark, postLike, getUserInfo } from 'apis/user';

export const usePostBookmarkMutation = (record_id: number, body: object, token: string) => {
  const queryClient = useQueryClient();
  return useMutation(() => postBookmark(record_id, body, token), {
    onSuccess: () => {
      queryClient.invalidateQueries(['getCommunity']);
      queryClient.invalidateQueries(['getCommunityDetail']);
    },
  });
};

export const usePostLikekMutation = (record_id: number, body: object, token: string) => {
  const queryClient = useQueryClient();
  return useMutation(() => postLike(record_id, body, token), {
    onSuccess: () => {
      queryClient.invalidateQueries(['getCommunityDetail']);
    },
  });
};

export const useUserInfoQuery = (token: string) => {
  const data = useQuery(['getUserInfo'], () => getUserInfo(token));
  return data;
};
