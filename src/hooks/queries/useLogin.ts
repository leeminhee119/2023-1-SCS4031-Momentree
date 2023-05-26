import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postLogin } from 'apis/login';
import moment from 'moment';
import { useCookies } from 'react-cookie';

interface LoginResult {
  result: { token: string };
}
export const useLoginMutation = (userName: string, password: string) => {
  const [cookies, setCookie] = useCookies(['user']);
  const queryClient = useQueryClient();
  const expires = moment().add('30', 'm').toDate();

  return useMutation(() => postLogin({ userName: userName, password: password }), {
    onSuccess: (data: LoginResult) => {
      setCookie('user', { userToken: `Bearer ${data.result.token}`, userName: userName }, { expires }); // 쿠키에 토큰 저장
      queryClient.invalidateQueries(['getCommunity']);
      return cookies;
    },
  });
};
