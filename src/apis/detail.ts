import { GET, DELETE } from 'apis/api';

export const getCommunityDetail = async (postId: number) => {
  const { data } = await GET(`/community/${postId}`);
  return data;
};

export const deleteCommunityDetail = async (postId: number, token: string) => {
  const { data } = await DELETE(`/community/${postId}`, token);
  return data;
};
