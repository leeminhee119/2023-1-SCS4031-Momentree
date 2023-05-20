import { useMutation } from '@tanstack/react-query';
import { postBookmark, postLike } from 'apis/user';

export const usePostBookmarkMutation = (record_id: number, body: object, token: string) => {
  return useMutation(() => postBookmark(record_id, body, token));
};

export const usePostLikekMutation = (record_id: number, body: object, token: string) => {
  return useMutation(() => postLike(record_id, body, token));
};
