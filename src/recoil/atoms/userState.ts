import { atom } from 'recoil';

interface IUserState {
  userName: string;
  token: string;
}
export const userState = atom<IUserState>({
  key: 'userState',
  default: {
    userName: '',
    token: '',
  },
});
