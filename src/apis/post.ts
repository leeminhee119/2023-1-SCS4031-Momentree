import { POST } from 'apis/api';
import { IRecord } from 'types/post';

export const postDate = async (body: IRecord, token: string) => {
  const { data } = await POST('/community', body, token);
  return data;
};
