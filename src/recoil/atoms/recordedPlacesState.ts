import { atom } from 'recoil';
import { IRecordedPlace } from 'types/post';

export const recordedPlacesState = atom<IRecordedPlace[]>({
  key: 'recordedPlacesState',
  default: [],
});

export const deletedPlacesState = atom<(number | undefined)[]>({
  key: 'deletedPlacesState',
  default: [],
});
