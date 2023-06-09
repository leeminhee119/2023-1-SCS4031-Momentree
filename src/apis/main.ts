import { GET } from 'apis/api';

export const getCommunity = async (page: number, size: number, filter: string, token?: string) => {
  if (token) {
    const { data } = await GET(`/community/login?page=${page}&size=${size}&sort=${filter}`, token);
    return data;
  } else {
    const { data } = await GET(`/community?page=${page}&size=${size}&sort=${filter}`);
    return data;
  }
};

export const getRecommendList = async (token?: string) => {
  const { data } = await GET(`/recommendation`, token);
  return data;
};
