import { POST } from 'apis/api';
import { GET } from 'apis/api';
import { PATCH } from 'apis/api';
import { INewUserImage } from 'types/user';

export const postBookmark = async (record_id: number, body: object, token: string) => {
  const { data } = await POST(`/community/${record_id}/bookmark`, body, token);
  return data;
};

export const postLike = async (record_id: number, body: object, token: string) => {
  const { data } = await POST(`/community/${record_id}/likes`, body, token);
  return data;
};

export const getUserInfo = async (token: string) => {
  const { data } = await GET(`/userInfo`, token);
  return data;
};

export const postFollow = async (body: object, token: string) => {
  const { data } = await POST(`/follow`, body, token);
  return data;
};

export const patchModifyUserInfo = async (body: INewUserImage, token: string) => {
  const { data } = await PATCH('/modifyUserInfo', body, token);
  return data;
};
