/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IPlaceKakao } from 'types/kakaoMap';
import searchIcon from '../../assets/icons/search.svg';
import closeIcon from '../../assets/icons/close.svg';

interface ModalProps {
  setResultsParent: React.Dispatch<React.SetStateAction<IPlaceKakao[]>>;
  handleModalClose: () => void;
  handleClickListItem: (index: number) => void;
}

const SearchModal = ({ setResultsParent, handleModalClose, handleClickListItem }: ModalProps) => {
  const { kakao } = window;
  const [keyword, setKeyword] = useState('');

  const [results, setResults] = useState<IPlaceKakao[]>([]); // 키워드 검색 결과들을 담는 배열

  // 키워드로 검색한 결과 목록을 받아옵니다
  useEffect(() => {
    if (keyword !== '') {
      // 장소 검색 객체
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(keyword, (data: IPlaceKakao[], status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          setResults(data);
          setResultsParent(data);
        }
      });
    }
  }, [keyword]);

  return (
    <ModalBackground>
      <ModalLayout>
        <TitleBox>
          데이트 코스 추가하기
          <div onClick={handleModalClose}>
            <CloseIcon src={closeIcon} alt="닫기 버튼" />
          </div>
        </TitleBox>
        <>
          <SearchContainer>
            <SearchContainder
              placeholder="추가할 코스를 검색해주세요"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
            />
            <SearchIcon src={searchIcon} alt="검색 아이콘" />
          </SearchContainer>
        </>
        <SearchResultList>
          {results.map((place: IPlaceKakao, index: number) => {
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
      </ModalLayout>
    </ModalBackground>
  );
};

const CloseIcon = styled.img`
  width: 1.5rem;
`;
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;
const ModalLayout = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 70%;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 1.8rem;
  z-index: 1000;
`;
const TitleBox = styled.div`
  ${({ theme }) => theme.fonts.suubtitle1};
  display: flex;
  justify-content: space-between;
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
const SearchResultList = styled.ul``;
export default SearchModal;
