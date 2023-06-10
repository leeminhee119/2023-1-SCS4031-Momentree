export interface IHashtag {
  tagName: string;
  type: string;
}
export interface IImage {
  orders: number;
  imgFile?: File;
  imgFormData?: string; //TODO: 혼란 방지 위해 'imgFormData' 명칭을 'base64'로 서버와 함께 변경하는 게 좋을 것 같아요.
  fileName?: string;
  contentType?: string;
}
export interface IRecordedPlace {
  placeId?: number;
  orders: number;
  newOrders?: number;
  placeName: string; //파스타노
  placeContent: string; //정말 맛있어요
  newPlaceContent?: string;
  address: string; //송파구 잠실동 ....
  addressGu: string; //서울시 송파구
  addressX: string; //x좌표
  addressY: string; //y좌표
  images: IImage[]; //url1
}

// 글 작성하기에서 API로 POST할 데이터 타입
export interface IRecord {
  userName: string;
  title: string;
  dateDate: string; //2023-04-16
  recordedContent: string;
  exposure: string; //OPEN
  hashtags: IHashtag[];
  recordedPlaces: IRecordedPlace[];
}

export interface IImageFilesState {
  placeIdx: number;
  files: File[];
}
