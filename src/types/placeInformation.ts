export interface PlaceInformation {
  placeId: number;
  recordId: number;
  orders: number;
  placeName: string;
  address: string;
  addressGu: string;
  addressX: string;
  addressY: string;
  placeContent: string;
  placeImages: PlaceImageProps[];
}

export interface PlaceImageProps {
  imageUrl: string;
  orders: number;
}
