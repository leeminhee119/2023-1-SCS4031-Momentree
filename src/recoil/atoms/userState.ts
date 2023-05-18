import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

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
  effects_UNSTABLE: [persistAtom],
});
