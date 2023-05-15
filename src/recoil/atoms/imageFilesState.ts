import { atom } from 'recoil';
import { IImageFilesState } from 'types/post';
/**
 * 각 데이트 코스 장소의 이미지 파일들을 배열로 함께 저장합니다.
 * [{placeIdx: 0, files: ...}, {placeIdx: 1, files: ...}, ...]
 */
export const imageFilesState = atom<IImageFilesState[]>({
  key: 'imageFilesState',
  default: [],
});
