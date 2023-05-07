export interface IHashtag {
  tagName: string;
  type: string;
}
export interface IImage {
  order: number;
  imgUrl: string;
}
export interface IRecordedPlace {
  orders: number;
  placeName: string; //파스타노
  placeContent: string; //정말 맛있어요
  address: string; //송파구 잠실동 ....
  addressGu: string; //서울시 송파구
  addressX: string; //x좌표
  addressY: string; //y좌표
  image: IImage[]; //url1
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
