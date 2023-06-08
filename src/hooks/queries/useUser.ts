/* eslint-disable @typescript-eslint/no-floating-promises */
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { postBookmark, postLike, getUserInfo, postFollow, patchModifyUserInfo } from 'apis/user';
import { INewUserImage } from 'types/user';

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

export const usePostFollowMutation = (body: object, token: string) => {
  return useMutation(() => postFollow(body, token));
};

export const useModifyUserMutation = (body: INewUserImage, token: string, successCallBack: () => void) => {
  return useMutation(() => patchModifyUserInfo(body, token), {
    onSuccess: successCallBack,
  });
};
