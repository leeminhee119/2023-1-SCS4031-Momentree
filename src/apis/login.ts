import { POST } from 'apis/api';
interface IBody {
  userName: string;
  password: string;
}
export const postLogin = async (body: IBody) => {
  const { data } = await POST('/login', body);
  return data;
};
