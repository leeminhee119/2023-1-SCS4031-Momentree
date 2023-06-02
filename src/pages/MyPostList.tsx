import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import leftIcon from '../assets/icons/left.svg';
import PostItem from 'components/common/PostMainItem';
import { useMyPostListQuery } from 'hooks/queries/useMyPage';
import Loader from 'components/common/Loader';
import { useCookies } from 'react-cookie';
import { CommunityData } from 'types/communityData';
import Blank from '../components/common/Blank';
import Bar from '../components/common/Bar';

const MyPostList = () => {
  //링크 이동에 사용되는 navigate;
  const navigate = useNavigate();
  //쿠키를 가져올때 사용되는 cookies;
  const [cookies] = useCookies(['user']);
  //무한스크롤 기능에 사용되는 ref변수
  const target = useRef<HTMLDivElement>(null);
  //
  const SIZE = 4;

  //페이지네이션에 필요한 페이지 0으로 초기화
  const [page, setPage] = useState<number>(0);
  //useMyPostListQuery이 쿼리를 통해 data를 불러옴.
  const { data } = useMyPostListQuery(page, SIZE, cookies.user.userToken);
  const [communityDataList, setCommunityDataLists] = useState<CommunityData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  //반환된 데이터 관찰 및 변화있을 때마다 communityDataList에 추가.
  useEffect(() => {
    const result = data?.result.content;
    if (result) {
      setCommunityDataLists([...communityDataList, ...result]);
    }
    setIsLoaded(false);
  }, [data]);

  //스크롤이 target 요소에 도달했을 때 새로운 데이터를 불러오는 역할을 함.
  const onIntersect = ([entry]: any, observer: { unobserve: (arg0: any) => void; observe: (arg0: any) => void }) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target); // 관찰요소 리셋
      if (page < data?.result.totalPages - 1) {
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
    <MyPostListContainer>
      <MyPostListHeader>
        <Icon
          src={leftIcon}
          alt="뒤로가기 아이콘"
          onClick={() => {
            navigate('/');
            window.location.reload();
          }}
        />
        <h1>나의 데이트 코스</h1>
      </MyPostListHeader>
      <Bar />
      <section ref={target} className="Target-Element">
        {communityDataList.length === 0 ? (
          <Blank message1="작성한 게시물이 없어요." message2="자신만의 데이트 코스를 공유해보세요!" />
        ) : (
          <>
            {communityDataList.map((data: CommunityData, index: number) => (
              <div
                key={index}
                onClick={() => {
                  navigate(`/post/${data.recordedId}`);
                  window.location.reload();
                }}>
                <PostItem
                  title={data.title}
                  bookMarkStatus={data.bookMarkStatus}
                  likeCnt={data.likeCnt}
                  bookmarkCnt={data.bookMarkCnt}
                  vibeTag={data.vibeTags}
                  activityTag={data.activityTags}
                  place={data.recordedPlaces}
                  recordedId={data.recordedId}
                />
              </div>
            ))}
            {isLoaded && <Loader />}
          </>
        )}
      </section>
    </MyPostListContainer>
  );
};

export default MyPostList;

const MyPostListContainer = styled.section`
  h1 {
    color: ${({ theme }) => theme.colors.gray900};
    ${({ theme }) => theme.fonts.heading2};
  }
`;

const MyPostListHeader = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 2.2rem;
`;

const Icon = styled.img`
  width: 19.67px;
  height: 16.67px;
  cursor: pointer;
`;
