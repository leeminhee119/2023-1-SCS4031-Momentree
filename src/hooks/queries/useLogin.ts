import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postLogin } from 'apis/login';
import moment from 'moment';
import { useCookies } from 'react-cookie';

interface LoginResult {
  result?: { token: string; nickname: string };
  reason?: string;
}

//TODO: 로그인 실패 시 상태코드 다르게 가져오면 setIsRedirect 파라미터 제거 (컴포넌트에서 직접 리다이렉트)
export const useLoginMutation = (userName: string, password: string, setIsRedirect: any) => {
  const [cookies, setCookie] = useCookies(['user']);
  const queryClient = useQueryClient();
  const expires = moment().add('30', 'm').toDate();

  return useMutation(() => postLogin({ userName: userName, password: password }), {
    onSuccess: (data: LoginResult) => {
      if (data.reason) {
        alert(data.reason);
      } else if (data.result) {
        setCookie(
          'user',
          { userToken: `Bearer ${data.result.token}`, userName: userName, nickname: data.result.nickname },
          { expires }
        ); // 쿠키에 토큰 저장
        queryClient.invalidateQueries(['getCommunity']);
        setIsRedirect(true);
        return cookies;
      }
    },
  });
};
