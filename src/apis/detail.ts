import { GET, DELETE } from 'apis/api';

export const getCommunityDetail = async (postId: number, token?: string) => {
  if (token) {
    const { data } = await GET(`/community/login/${postId}`, token);
    return data;
  } else {
    const { data } = await GET(`/community/${postId}`);
    return data;
  }
};

export const deleteCommunityDetail = async (postId: number, token: string) => {
  const { data } = await DELETE(`/community/${postId}`, token);
  return data;
};
