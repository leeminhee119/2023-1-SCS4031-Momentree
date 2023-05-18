import { GET } from 'apis/api';

export const getMyPostList = async (token: string) => {
  const { data } = await GET('/myPage/myRecord', token);
  return data;
};
