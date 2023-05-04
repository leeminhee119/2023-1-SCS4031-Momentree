// window 객체 아래 새로운 프로퍼티 kakao 타입 지정
declare global {
  interface Window {
    kakao: any;
  }
}

// 키워드로 검색했을 때 API에서 주는 데이터에 대한 타입
export interface IPlaceKakao {
  address_name: string;
  category_group_code?: string;
  category_group_name?: string;
  distance?: string;
  id?: string;
  phone?: string;
  place_url?: string;
  road_address_name: string;
  x: number;
  y: number;
  place_name: string;
}
