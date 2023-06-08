/* eslint-disable @typescript-eslint/no-floating-promises */
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { postBookmark, postLike, getUserInfo, getUserProfile, getUserPost } from 'apis/user';

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

export const useGetUserProfile = (userName: string) => {
  const data = useQuery(['getUserProfile', userName], () => getUserProfile(userName));
  return data;
};

export const useGetUserPost = (page: number, size: number, userName: string) => {
  const data = useQuery(['getUserPost', userName, page], () => getUserPost(page, size, userName));
  return data;
};
