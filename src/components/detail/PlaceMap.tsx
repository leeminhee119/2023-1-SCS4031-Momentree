import styled from 'styled-components';
import { useEffect, useState } from 'react';
import PlaceMapModal from './PlaceMapModal';
import { PlaceInformation, PlaceImageProps } from 'types/placeInformation';

interface PlaceMapProps {
  placeList: PlaceInformation[];
}

const PlaceMap = ({ placeList }: PlaceMapProps) => {
  const { kakao } = window;
  const [isOpenPlace, setIsOpenPlace] = useState<boolean>(false);
  const [clickedMarkerName, setClickedMarkerName] = useState<string>(''); // 지도에서 클릭한 마커의 장소명
  const [clickedMarkerContent, setClickedMarkerContent] = useState<string>(''); // 지도에서 클릭한 마커의 장소 내용
  const [clickedMarkerImage, setClickedMarkerImage] = useState<PlaceImageProps[]>([]); // 지도에서 클릭한 마커의 장소 이미지

  let sumX = 0;
  let sumY = 0;

  useEffect(() => {
    placeList?.forEach((place) => {
      sumX += Number(place.addressX);
      sumY += Number(place.addressY);
    });

    const mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(sumY / 2, sumX / 2), // 지도의 중심좌표
        level: 4, // 지도의 확대 레벨
      };

    const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 마커 이미지의 이미지 주소입니다
    const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

    placeList.map((place) => {
      // 마커 이미지의 이미지 크기 입니다
      const imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(place.addressY, place.addressX), // 마커를 표시할 위치
        image: markerImage, // 마커 이미지
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        setIsOpenPlace(true);
        setClickedMarkerName(place.placeName); // 마커(장소) 아이디
        setClickedMarkerContent(place.placeContent); // 마커(장소) 아이디
        setClickedMarkerImage(place.placeImages); // 마커(장소) 아이디
      });
    });
  }, []);

  return (
    <>
      <MapLayout>
        <MapBox id="map" />
      </MapLayout>
      {isOpenPlace ? (
        <PlaceMapModal
          placeName={clickedMarkerName}
          placeContent={clickedMarkerContent}
          placeImage={clickedMarkerImage}
          handleModalClose={() => setIsOpenPlace(false)}
        />
      ) : null}
    </>
  );
};

const MapLayout = styled.div`
  padding: 1.5rem 0;
`;
const MapBox = styled.div`
  width: 100%;
  height: 20rem;
  border-radius: 1.2rem;
`;

export default PlaceMap;
