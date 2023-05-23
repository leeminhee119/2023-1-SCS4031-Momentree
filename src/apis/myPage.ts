import { GET } from 'apis/api';

export const getMyPostList = async (token: string) => {
  const { data } = await GET('/myPage/myRecord?page=1&size=2', token);
  return data;
};
