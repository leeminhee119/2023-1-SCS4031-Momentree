import { PlaceInformation } from './placeInformation';

export interface CommunityData {
  activityTags: Tag[];
  bookMarkCnt: number;
  bookMarkStatus: boolean;
  createdAt: string;
  customTags: string[];
  likeCnt: number;
  likeStatus: boolean;
  recordedId: number;
  recordedPlaces: Array<PlaceInformation>;
  title: string;
  userName: string;
  vibeTags: Tag[];
}

interface Tag {
  tagName: string;
}
