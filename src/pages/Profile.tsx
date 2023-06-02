import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import leftIcon from '../assets/icons/left.svg';
import defaultProfileIcon from '../assets/icons/profile_grey.svg';
// import { useCookies } from 'react-cookie';
import PostItem from 'components/common/PostMainItem';
import { CommunityData } from 'types/communityData';
import Blank from '../components/common/Blank';
import Bar from '../components/common/Bar';
import Loader from 'components/common/Loader';

const Profile = () => {
  const { userName } = useParams();
  const navigate = useNavigate();
  // const [cookies] = useCookies(['user']);
  const target = useRef<HTMLDivElement>(null);
  // const SIZE = 4;
  // const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true); // 초기 데이터를 불러오는 로딩
  // const { data } = useMyBookMarkListQuery(page, SIZE, cookies.user.userToken);
  // const [communityDataList, setCommunityDataLists] = useState<CommunityData[]>([]);
  const communityDataList: CommunityData[] = [];
  const isLoaded = false;
  // const [isLoaded, setIsLoaded] = useState(false); // 새로운 데이터를 불러오는 로딩

  useEffect(() => {
    setIsLoading(false);
  }, []);

  // useEffect(() => {
  //   const result = data?.result.content;
  //   if (result) {
  //     setCommunityDataLists([...communityDataList, ...result]);
  //   }
  //   setIsLoaded(false);
  //   setIsLoading(false);
  // }, [data]);

  // const onIntersect = ([entry]: any, observer: { unobserve: (arg0: any) => void; observe: (arg0: any) => void }) => {
  //   if (entry.isIntersecting && !isLoaded) {
  //     observer.unobserve(entry.target); // 관찰요소 리셋
  //     if (page < data?.result.totalPages - 1) {
  //       setIsLoaded(true);
  //       setPage((page) => page + 1);
  //     }
  //     observer.observe(entry.target); // 다시 관찰요소 지정
  //   }
  // };

  // useEffect(() => {
  //   let observer: IntersectionObserver;
  //   if (target.current) {
  //     observer = new IntersectionObserver(onIntersect, {
  //       threshold: 0.2,
  //     });
  //     observer.observe(target.current);
  //   }
  //   return () => observer && observer.disconnect();
  // }, [onIntersect]);

  return (
    <ProfileContainer>
      <ProfileListHeader>
        <Icon
          src={leftIcon}
          alt="뒤로가기 아이콘"
          onClick={() => {
            navigate(-1);
          }}
        />
        <h1> {userName}의 프로필</h1>
      </ProfileListHeader>
      <UserConatiner>
        <UserInfo>
          <UserImage src={defaultProfileIcon} alt="유저 이미지" />
          <UserName>{userName}</UserName>
        </UserInfo>
        <UserFollower>
          <article>
            <h1>팔로워</h1>
            <p>113</p>
          </article>
          <article>
            <h1>팔로잉</h1>
            <p>83</p>
          </article>
        </UserFollower>
      </UserConatiner>
      <Bar />
      <section ref={target} className="Target-Element">
        {!isLoading && communityDataList.length === 0 ? (
          <Blank message1="아직 작성한 게시글이 없어요!" />
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
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.section`
  h1 {
    color: ${({ theme }) => theme.colors.gray900};
    ${({ theme }) => theme.fonts.heading2};
  }
`;

const ProfileListHeader = styled.article`
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

const UserConatiner = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.2rem;
`;

const UserInfo = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UserImage = styled.img`
  width: 32px;
  height: 32px;
  border-raidous: 50%;
  margin-right: 10px;
`;

const UserName = styled.h1``;

const UserFollower = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 8px 44px;
  width: 239px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray200};
  ${({ theme }) => theme.fonts.body1};

  article {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  div {
    background-color: ${({ theme }) => theme.colors.border};
    height: 1px;
  }
  h1 {
    color: ${({ theme }) => theme.colors.gray500};
    ${({ theme }) => theme.fonts.caption2};
  }

  p {
    color: ${({ theme }) => theme.colors.gray900};
    ${({ theme }) => theme.fonts.body3};
  }
`;
