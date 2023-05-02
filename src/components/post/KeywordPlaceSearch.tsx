/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import styled from 'styled-components';
import { IPlaceKakao } from 'types/kakaoMap';
import { IRecordedPlace } from 'types/post';
import { useEffect, useState } from 'react';
import searchIcon from '../../assets/icons/search.svg';
import SearchModal from './SearchModal';
import PlaceModal from './PlaceModal';
import { recordedPlacesState } from '\brecoil/atoms/recordedPlacesState';
import { useSetRecoilState } from 'recoil';

interface IMapOptions {
  center: any;
  level: number;
}

const KeywordPlaceSearch = () => {
  const { kakao } = window;
  const [map, setMap] = useState<any>(null);
  const [results, setResults] = useState<IPlaceKakao[]>([]); // 키워드 검색 결과들을 담는 배열
  const [markers, setMarkers] = useState<any>([]); // 마커들을 담는 배열
  const [placesKakao, setPlacesKakao] = useState<IPlaceKakao[]>([]); // 데이트 코스에 추가한 장소 배열

  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);
  const [isOpenPlace, setIsOpenPlace] = useState<boolean>(false);
  const [clickedMarkerIdx, setClickedMarkerIdx] = useState<number>(0); // 지도에서 클릭한 마커의 인덱스

  const setPlaces = useSetRecoilState<IRecordedPlace[]>(recordedPlacesState);

  // 지도를 불러옵니다
  useEffect(() => {
    const container = document.getElementById('map');

    // 선택한 장소가 없을 때, 지도에 표시할 default 장소
    if (placesKakao.length === 0) {
      const options: IMapOptions = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표
        level: 4, //지도의 레벨(확대, 축소 정도)
      };
      const newMap = new kakao.maps.Map(container, options);
      setMap(newMap);
    } else {
      const options: IMapOptions = {
        center: new kakao.maps.LatLng(placesKakao[placesKakao.length - 1].x, placesKakao[placesKakao.length - 1].y), //지도의 중심좌표
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
        bounds.extend(new kakao.maps.LatLng(placesKakao[i].y, placesKakao[i].x));
        map.setBounds(bounds);
      }
      setMap(newMap);

      // 장소 데이터를 형식에 맞게 업데이트합니다
      const curOrder = markers.length;
      const curPlaceKakao = placesKakao[curOrder - 1];
      const guStartIdx = curPlaceKakao.road_address_name.indexOf(' ') + 1;
      const guEndIdx = curPlaceKakao.road_address_name.indexOf('구 ') + 1;
      setPlaces((prevPlaces: IRecordedPlace[]) => [
        ...prevPlaces,
        {
          orders: curOrder,
          placeName: curPlaceKakao.place_name,
          placeContent: '',
          address: curPlaceKakao.road_address_name,
          addressGu: curPlaceKakao.road_address_name.substring(guStartIdx, guEndIdx),
          addressX: curPlaceKakao.x.toString(),
          addressY: curPlaceKakao.y.toString(),
          image: [],
        },
      ]);
    }
  }, [markers]);

  /**
   * 마커를 생성하고 지도에 마커를 표시함
   * @param position new kakao.maps.LatLng(y좌표, x좌표)
   * @param idx 마커 번호 (0부터 시작, 표시될 번호 - 1)
   */
  function addMarker(position: any, order: number) {
    const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
      imgOptions = {
        spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
        spriteOrigin: new kakao.maps.Point(0, order * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      },
      markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
      // 마커 생성
      marker = new kakao.maps.Marker({
        position: position, // 마커의 위치
        image: markerImage,
      });

    // 마커에 클릭 이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function () {
      setIsOpenPlace(true);
      setClickedMarkerIdx(order);
    });

    setMarkers((prevMarkers: any) => [...prevMarkers, marker]); // 배열에 생성된 마커를 추가합니다
  }

  /**
   * 선택한 장소를 데이트 코스에 추가하고 지도에 표시하는 함수
   * @param index 결과 목록에서의 인덱스
   */
  function handleClickListItem(index: number) {
    setIsOpenSearch(false);
    // 데이트 코스에 추가합니다
    setPlacesKakao((prevPlaces: IPlaceKakao[]) => [...prevPlaces, results[index]]);

    // 마커를 생성하고 지도에 표시합니다
    const placePosition = new kakao.maps.LatLng(results[index].y, results[index].x);
    addMarker(placePosition, placesKakao.length);
  }
  return (
    <>
      <MapLayout>
        <MapBox id="map" />
      </MapLayout>
      <>
        <SearchContainer onClick={() => setIsOpenSearch(true)}>
          <SearchContainder placeholder="추가할 코스를 검색해주세요" />
          <SearchIcon src={searchIcon} alt="검색 아이콘" />
        </SearchContainer>
        {isOpenSearch ? (
          <SearchModal
            handleModalClose={() => setIsOpenSearch(false)}
            setResultsParent={setResults}
            handleClickListItem={handleClickListItem}
          />
        ) : null}
        {isOpenPlace ? <PlaceModal placeIdx={clickedMarkerIdx} handleModalClose={() => setIsOpenPlace(false)} /> : null}
      </>
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

/* Search Box */
const SearchContainer = styled.section`
  position: relative;
`;

const SearchContainder = styled.input`
  width: 100%;
  height: 4.6rem;
  padding: 1.5rem;
  padding-left: 3.6rem;
  background-color: ${({ theme }) => theme.colors.gray200};
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.colors.gray900};
  ${({ theme }) => theme.fonts.body2};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray400};
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 1.4rem;
  margin-top: 1.6rem;
  z-index: 1;
  color: rgb(79, 91, 102);
`;
export default KeywordPlaceSearch;
