// export interface RecommendationItemProps {
//   title: string;
//   bookMarkStatus: boolean;
//   likeCnt: number;
//   bookmarkCnt: number;
//   place: string[]; //구
// }

import { PlaceInformation } from './placeInformation';

export interface RecommendationItemProps {
  recordedId: number;
  title: string;
  bookMarkStatus: boolean;
  likeCnt: number;
  bookmarkCnt: number;
  place?: Array<PlaceInformation>; //지도
}
