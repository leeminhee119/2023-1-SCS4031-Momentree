import { atom } from 'recoil';
import { IRecord } from 'types/post';

export const recordState = atom<IRecord>({
  key: 'recordState',
  default: {
    userName: 'hello123',
    title: '',
    dateDate: new Date().toLocaleDateString(),
    recordedContent: '',
    exposure: 'OPEN',
    hashtags: [],
    recordedPlaces: [],
  },
});
