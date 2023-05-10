import { useQuery } from '@tanstack/react-query';
import { postLogin } from 'apis/login';

interface IBody {
  userName: string;
  password: string;
}
export const useLogin = (body: IBody) => {
  return useQuery([postLogin], () => postLogin(body));
};
