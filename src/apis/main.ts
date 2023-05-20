import { GET } from 'apis/api';

export const getCommunity = async () => {
  const { data } = await GET('/community');
  return data;
};

export const getLoginCommunity = async (token: string) => {
  const { data } = await GET('/community/login', token);
  return data;
};
