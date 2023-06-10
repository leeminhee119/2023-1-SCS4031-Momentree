/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import {
  postBookmark,
  postLike,
  getUserInfo,
  getUserProfile,
  getUserPost,
  postFollow,
  patchModifyUserInfo,
} from 'apis/user';
import { INewUserImage } from 'types/user';

export const usePostBookmarkMutation = (record_id: number, body: object, token: string) => {
  const queryClient = useQueryClient();
  return useMutation(() => postBookmark(record_id, body, token), {
    onSuccess: () => {
      queryClient.invalidateQueries(['getCommunityDetail']);
    },
    onMutate: (record_id) => {
      queryClient.cancelQueries(['getCommunityDetail']);
      const snapshotOfPrevious = queryClient.getQueryData(['getCommunityDetail']);

      if (snapshotOfPrevious) {
        queryClient.setQueryData(['getCommunityDetail'], () => {
          const previousResult: any = { ...snapshotOfPrevious };
          let result = {};
          if (previousResult.result.bookMarkStatus === 1) {
            result = { ...previousResult.result, bookMarkStatus: 0 };
          } else {
            result = { ...previousResult.result, bookMarkStatus: 1 };
          }
          const data = { result };
          return data;
        });
      }
      return () => queryClient.setQueryData(['getCommunityDetail', { record_id }], snapshotOfPrevious);
    },
    onError: (error, values, rollback) => {
      rollback && rollback();
    },
  });
};

export const usePostLikekMutation = (record_id: number, body: object, token: string) => {
  const queryClient = useQueryClient();
  return useMutation(() => postLike(record_id, body, token), {
    onSuccess: () => {
      queryClient.invalidateQueries(['getCommunityDetail']);
    },
    onMutate: (record_id) => {
      queryClient.cancelQueries(['getCommunityDetail']);
      const snapshotOfPrevious = queryClient.getQueryData(['getCommunityDetail']);

      if (snapshotOfPrevious) {
        queryClient.setQueryData(['getCommunityDetail'], () => {
          const previousResult: any = { ...snapshotOfPrevious };
          let result = {};
          if (previousResult.result.likeStatus === 1) {
            result = { ...previousResult.result, likeStatus: 0 };
          } else {
            result = { ...previousResult.result, likeStatus: 1 };
          }
          const data = { result };
          return data;
        });
      }

      return () => queryClient.setQueryData(['getCommunityDetail', { record_id }], snapshotOfPrevious);
    },
    onError: (error, values, rollback) => {
      rollback && rollback();
    },
  });
};

export const useUserInfoQuery = (token: string) => {
  const data = useQuery(['getUserInfo'], () => getUserInfo(token));
  return data;
};

export const usePostFollowMutation = (body: { nickname: string }, token: string) => {
  return useMutation(() => postFollow(body, token));
};

export const useModifyUserMutation = (body: INewUserImage, token: string, successCallBack: () => void) => {
  return useMutation(() => patchModifyUserInfo(body, token), {
    onSuccess: successCallBack,
  });
};

export const useGetUserProfile = (userName: string) => {
  const data = useQuery(['getUserProfile', userName], () => getUserProfile(userName));
  return data;
};

export const useGetUserPost = (page: number, size: number, userName: string) => {
  const data = useQuery(['getUserPost', userName, page], () => getUserPost(page, size, userName));
  return data;
};
