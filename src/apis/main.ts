import { GET } from 'apis/api';

export const getCommunity = async () => {
  const { data } = await GET('/community');
  return data;
};
