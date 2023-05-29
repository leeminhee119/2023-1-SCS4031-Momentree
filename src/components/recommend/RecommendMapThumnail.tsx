import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { PlaceInformation } from 'types/placeInformation';

interface MapOptions {
  center: any;
  draggable: boolean;
  level: number;
}
interface MapThumbnailProps {
  recordedId: number;
  places: PlaceInformation[] | undefined;
}

const RecommendMapThumbnail = ({ recordedId, places }: MapThumbnailProps) => {
  const { kakao } = window;
  const [map, setMap] = useState(null);

  // 지도를 불러옵니다
  useEffect(() => {
    const container = document.getElementById(`map-${recordedId}`);
    const options: MapOptions = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표
      draggable: false,
      level: 4, //지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(container, options);
    addMarker(map);
  }, []);

  useEffect(() => {
    if (places?.length !== 0 && map) {
      addMarker(map);
    }
  }, [places]);

  const addMarker = (newMap: any) => {
    // 마커 이미지
    const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new kakao.maps.Size(36, 37); // 마커 이미지의 크기

    // 지도 범위 재설정 위한 바운더리 객체
    const bounds = new kakao.maps.LatLngBounds();
    places?.forEach((placeInfo: PlaceInformation, index: number) => {
      /* 1. 위치 객체 생성 */
      const placePosition = new kakao.maps.LatLng(placeInfo.addressY, placeInfo.addressX);

      /* 2. 해당 위치의 마커 생성 */
      // 마커 생성
      const imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(0, index * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);

      new kakao.maps.Marker({
        position: placePosition, // 마커의 위치
        image: markerImage,
        map: newMap,
      });

      /* 3. 지도 범위 재설정 */
      bounds.extend(new kakao.maps.LatLng(placeInfo.addressY, placeInfo.addressX));
    });

    newMap.setBounds(bounds);
    setMap(newMap);
  };

  return (
    <MapLayout>
      <MapBox id={'map-' + String(recordedId)} />
    </MapLayout>
  );
};

export default RecommendMapThumbnail;

const MapLayout = styled.div``;
const MapBox = styled.article`
  width: 100%;
  height: 13rem;
  border-radius: 1.2rem;
`;
