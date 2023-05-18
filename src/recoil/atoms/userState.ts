import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

interface IUserState {
  userName: string;
  token: string;
}
const { persistAtom } = recoilPersist({
  key: 'localStorage',
  storage: localStorage,
});
export const userState = atom<IUserState>({
  key: 'userState',
  default: {
    userName: '',
    token: '',
  },
  effects_UNSTABLE: [persistAtom],
});
