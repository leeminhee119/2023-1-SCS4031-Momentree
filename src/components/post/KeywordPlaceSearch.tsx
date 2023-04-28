/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import styled from 'styled-components';
import { IPlace } from 'types/kakaoMap';
import { useEffect, useState } from 'react';
import Search from './Search';

interface IMapOptions {
  center: any;
  level: number;
}
const KeywordPlaceSearch = () => {
  const { kakao } = window;
  const [map, setMap] = useState<any>(null);
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<IPlace[]>([]); // 키워드 검색 결과들을 담는 배열
  const [markers, setMarkers] = useState<any>([]); // 마커들을 담는 배열
  const [places, setPlaces] = useState<IPlace[]>([]); // 데이트 코스에 추가한 장소 배열

  // 지도를 불러옵니다
  useEffect(() => {
    const container = document.getElementById('map');

    // 선택한 장소가 없을 때, 지도에 표시할 default 장소
    if (places.length === 0) {
      const options: IMapOptions = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표
        level: 4, //지도의 레벨(확대, 축소 정도)
      };
      const newMap = new kakao.maps.Map(container, options);
      setMap(newMap);
    } else {
      const options: IMapOptions = {
        center: new kakao.maps.LatLng(places[places.length - 1].x, places[places.length - 1].y), //지도의 중심좌표
        level: 4, //지도의 레벨(확대, 축소 정도)
      };
      const newMap = new kakao.maps.Map(container, options);
      setMap(newMap);
    }
  }, []);

  // 지도에 마커를 표시합니다
  useEffect(() => {
    const newMap = map;
    if (markers.length !== 0) {
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      const bounds = new kakao.maps.LatLngBounds();

      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(newMap);
        bounds.extend(new kakao.maps.LatLng(places[i].y, places[i].x));
        map.setBounds(bounds);
      }
      setMap(newMap);
    }
  }, [markers]);

  // 키워드로 검색한 결과 목록을 받아옵니다
  useEffect(() => {
    if (keyword !== '') {
      // 장소 검색 객체
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(keyword, (data: IPlace[], status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          setResults(data);
        }
      });
    }
  }, [keyword]);

  /**
   * 마커를 생성하고 지도에 마커를 표시함
   * @param position new kakao.maps.LatLng(y좌표, x좌표)
   * @param idx 마커 번호 (0부터 시작, 표시될 번호 - 1)
   */
  function addMarker(position: any, idx: number) {
    const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
      imgOptions = {
        spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
        spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      },
      markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
      // 마커 생성
      marker = new kakao.maps.Marker({
        position: position, // 마커의 위치
        image: markerImage,
      });

    setMarkers((prevMarkers: any) => [...prevMarkers, marker]); // 배열에 생성된 마커를 추가합니다
  }

  /**
   * 선택한 장소를 데이트 코스에 추가하고 지도에 표시하는 함수
   * @param index 결과 목록에서의 인덱스
   */
  function handleClickListItem(index: number) {
    // 데이트 코스에 추가합니다
    setPlaces((prevPlaces: IPlace[]) => [...prevPlaces, results[index]]);

    // 마커를 생성하고 지도에 표시합니다
    const placePosition = new kakao.maps.LatLng(results[index].y, results[index].x);
    addMarker(placePosition, places.length);
  }
  return (
    <>
      <MapLayout>
        <MapBox id="map" />
      </MapLayout>
      <Search placeholder="추가할 코스를 검색해주세요" onChange={setKeyword} />
      <SearchResultList>
        {results.map((place: IPlace, index: number) => {
          return (
            <li
              key={index}
              onClick={() => {
                handleClickListItem(index);
              }}>
              {place.place_name}
            </li>
          );
        })}
      </SearchResultList>
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

const SearchResultList = styled.ul``;
export default KeywordPlaceSearch;
