import { atom } from 'recoil';

interface ILoginState {
  userName: string;
  password: string;
}
export const loginState = atom<ILoginState>({
  key: 'loginState',
  default: {
    userName: '',
    password: '',
  },
});
