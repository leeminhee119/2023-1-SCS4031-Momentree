import { useMutation } from '@tanstack/react-query';
import { postLogin } from 'apis/login';
import { useSetRecoilState } from 'recoil';
import { userState } from '\brecoil/atoms/userState';
interface LoginResult {
  result: { token: string };
}
export const useLoginMutation = (userName: string, password: string) => {
  const setUserState = useSetRecoilState(userState);
  return useMutation(() => postLogin({ userName: userName, password: password }), {
    onSuccess: (data: LoginResult) => {
      // 로그인 성공 시 userState의 유저네임 및 토큰을 업데이트합니다.
      setUserState(() => {
        return {
          userName: userName,
          token: `Bearer ${data.result.token}`,
        };
      });
    },
  });
};