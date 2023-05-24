import { postSignup } from 'apis/signup';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

interface IBody {
  userName: string;
  email: string;
  password: string;
  nickname: string;
}

const navigator = useNavigate();

export const useSignupMtutation = (body: IBody) => {
  return useMutation(() => postSignup(body), {
    onSuccess: () => {
      navigator('/');
    },
  });
};
