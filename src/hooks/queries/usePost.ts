import { useMutation } from '@tanstack/react-query';
import { postDate } from 'apis/post';
import { IRecord } from 'types/post';

export const usePostMutation = (record: IRecord, token: string, successCallBack: () => void) => {
  return useMutation(() => postDate(record, token), {
    onSuccess: successCallBack,
  });
};
