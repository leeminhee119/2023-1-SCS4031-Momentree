import { GET } from 'apis/api';

export const getCommunity = async (token?: string) => {
  if (token) {
    const { data } = await GET('/community/login', token);
    return data;
  } else {
    const { data } = await GET('/community');
    return data;
  }
};

export const getRecommendList = async (token: string) => {
  const { data } = await GET('/community/recommend', token);
  return data;
};
