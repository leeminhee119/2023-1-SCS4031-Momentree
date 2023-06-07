import { POST } from 'apis/api';
import { GET } from 'apis/api';

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

export const getUserProfile = async (userName: string) => {
  const { data } = await GET(`/user?nickname=${userName}`);
  return data;
};

export const getUserPost = async (page: number, size: number, userName: string) => {
  const { data } = await GET(`/records?nickname=${userName}&page=${page}&size=${size}`);
  return data;
};
