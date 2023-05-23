import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import filterIcon from '../../assets/icons/filter.svg';
import { CommunityData } from '../../types/communityData';
import PostItem from 'components/common/PostMainItem';
import Loader from 'components/common/Loader';
import { useCookies } from 'react-cookie';
import { useCommunityQuery } from '../../hooks/queries/useCommunity';

const Community = () => {
  const [cookies] = useCookies(['user']);
  const target = useRef<HTMLDivElement>(null);
  const SIZE = 2;
  const [page, setPage] = useState<number>(0);
  const { data } = useCommunityQuery(page, SIZE, cookies?.user?.userToken);

  const [communityDataList, setCommunityDataLists] = useState<CommunityData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const result = data?.result.content;
    if (result) {
      setCommunityDataLists([...communityDataList, ...result]);
    }
    setIsLoaded(false);
  }, [data]);

  const onIntersect = ([entry]: any, observer: { unobserve: (arg0: any) => void; observe: (arg0: any) => void }) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target); // 관찰요소 리셋
      if (page < data?.result.totalPages) {
        setIsLoaded(true);
        setPage((page) => page + 1);
      }
      observer.observe(entry.target); // 다시 관찰요소 지정
    }
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target.current) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.2,
      });
      observer.observe(target.current);
    }
    return () => observer && observer.disconnect();
  }, [onIntersect]);

  return (
    <CommunityContainer>
      <Label>
        <img src={filterIcon} alt="필터 아이콘"></img>
        <Filter>
          <option>최신순</option>
          <option>인기순</option>
        </Filter>
      </Label>
      <CommunityList ref={target} className="Target-Element">
        {communityDataList && (
          <>
            {communityDataList.map((data: CommunityData, index: number) => {
              return (
                <PostItem
                  recordedId={data?.recordedId}
                  title={data?.title}
                  bookMarkStatus={data?.bookMarkStatus}
                  likeCnt={data?.likeCnt}
                  bookmarkCnt={data?.bookMarkCnt}
                  vibeTag={data?.vibeTags}
                  activityTag={data?.activityTags}
                  place={data?.recordedPlaces}
                  key={index}></PostItem>
              );
            })}
          </>
        )}
        {isLoaded && <Loader />}
      </CommunityList>
    </CommunityContainer>
  );
};

export default Community;

const CommunityContainer = styled.section`
  margin: 1.6rem 0;
`;

const Label = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;

  ${({ theme }) => theme.fonts.body4};
  color: ${({ theme }) => theme.colors.gray500};

  img {
    width: 1.4rem;
    height: 1.4rem;
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

const Filter = styled.select`
  outline: none;
  border: none;
  ${({ theme }) => theme.fonts.body4};
  color: ${({ theme }) => theme.colors.gray500};

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  background: #fff;
`;

const CommunityList = styled.section`
  margin-top: 1.6rem;
`;
