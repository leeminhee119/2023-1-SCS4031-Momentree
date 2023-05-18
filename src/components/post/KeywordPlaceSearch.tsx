/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import styled from 'styled-components';
import { IPlaceKakao } from 'types/kakaoMap';
import { IRecordedPlace } from 'types/post';
import { useState } from 'react';
import searchIcon from '../../assets/icons/search.svg';
import SearchModal from './SearchModal';
import { recordedPlacesState } from '\brecoil/atoms/recordedPlacesState';
import { useRecoilState } from 'recoil';
import Map from 'components/common/Map';

// interface IMapOptions {
//   center: any;
//   level: number;
// }

const KeywordPlaceSearch = () => {
  const [results, setResults] = useState<IPlaceKakao[]>([]); // 키워드 검색 결과들을 담는 배열

  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);

  const [places, setPlaces] = useRecoilState<IRecordedPlace[]>(recordedPlacesState); //추가한 데이트 장소

  /**
   * 선택한 장소를 데이트 코스에 추가하고 지도에 표시하는 함수
   * @param index 결과 목록에서의 인덱스
   */
  function handleClickListItem(index: number) {
    setIsOpenSearch(false);
    // 데이트 코스에 추가합니다
    // 장소 데이터를 업데이트합니다
    const curOrder = places.length + 1;
    const curPlaceKakao = results[index];
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
  return (
    <KeywordPlaceSearchLayout>
      <Map places={places} />
      <SearchContainer onClick={() => setIsOpenSearch(true)}>
        <SearchContainder placeholder="추가할 코스를 검색해주세요" />
        <SearchIcon src={searchIcon} alt="검색 아이콘" />
      </SearchContainer>
      {isOpenSearch && (
        <SearchModal
          handleModalClose={() => setIsOpenSearch(false)}
          setResultsParent={setResults}
          handleClickListItem={handleClickListItem}
        />
      )}
    </KeywordPlaceSearchLayout>
  );
};
const KeywordPlaceSearchLayout = styled.div`
  margin-bottom: 1rem;
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
