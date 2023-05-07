import { atom } from 'recoil';
import { IRecordedPlace } from 'types/post';

export const recordedPlacesState = atom<IRecordedPlace[]>({
  key: 'recordedPlacesState',
  default: [],
});
