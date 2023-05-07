import { GET } from 'apis/api';

export const getCommunityDetail = async (postId: number) => {
  const { data } = await GET(`/community/${postId}`);
  return data;
};
