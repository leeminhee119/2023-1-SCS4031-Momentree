import { atom } from 'recoil';
import { IHashtag } from 'types/post';

export const selectedTagsState = atom<IHashtag[]>({
  key: 'selectedTagsState',
  default: [],
});
