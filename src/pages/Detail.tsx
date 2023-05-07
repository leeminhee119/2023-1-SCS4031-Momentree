import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import clickbookmarkIcon from '../assets/icons/clickbookmark.svg';
import heartIcon from '../assets/icons/heart.svg';
import fillheartIcon from '../assets/icons/fillheart.svg';
import bookmarkIcon from '../assets/icons/bookmark.svg';
import leftIcon from '../assets/icons/left.svg';
import WriterInfo from 'components/detail/WriterInfo';
import { useCommunityDetailQuery } from 'hooks/queries/useCommunityDetail';
import { PlaceInformation } from 'types/placeInformation';
import PlaceMap from 'components/detail/PlaceMap';

const Detail = () => {
  const { postId } = useParams();
  const [ishearted, setIshearted] = useState<boolean>(true);
  const [isbookmarked, setIsbookmarked] = useState<boolean>(false);
  const navigate = useNavigate();
  const { data } = useCommunityDetailQuery(Number(postId));

  // 지도 더미 데이터
  const dummyData = [
    {
      recordId: 1,
      placeId: 23,
      orders: 1,
      placeName: '이따금',
      placeContent: '내가 제일 좋아하는 카페, 말차슈페너 진짜진짜 맛있음!!!!',
      address: '경기 수원시 팔달구 화서문로32번길 15',
      addressGu: '수원시 팔달구',
      addressX: '127.012027642142',
      addressY: '37.2843970838872',
      placeImages: [],
    },
    {
      recordId: 1,
      placeId: 33,
      orders: 2,
      placeName: '하우스플랜비',
      placeContent: '인생 뇨끼 맛집~~',
      address: '경기 수원시 팔달구 신풍로23번길 62',
      addressGu: '수원시 팔달구',
      addressX: '127.011531409585',
      addressY: '37.2839952698365',
      placeImages: [],
    },
  ];

  return (
    <DetailContainer>
      <DetailHeader>
        <Icon
          src={leftIcon}
          alt="뒤로가기 아이콘"
          onClick={() => {
            navigate(-1);
          }}
        />
        <div>
          {ishearted ? (
            <Icon src={fillheartIcon} alt="좋아요 한 아이콘" onClick={() => setIshearted(false)} />
          ) : (
            <Icon src={heartIcon} alt="좋아요 하지 않은 아이콘" onClick={() => setIshearted(true)} />
          )}
          {isbookmarked ? (
            <Icon src={clickbookmarkIcon} alt="북마크 한 아이콘" onClick={() => setIsbookmarked(false)} />
          ) : (
            <Icon src={bookmarkIcon} alt="북마크 하지 않은 아이콘" onClick={() => setIsbookmarked(true)} />
          )}
        </div>
      </DetailHeader>
      <DetailInfo>
        <TagContainer>
          <MoodTagContainer>
            {data?.result.vibeTags.map((item: string, index: number) => {
              return <article key={index}>{item}</article>;
            })}
          </MoodTagContainer>
          <ActivityTagContainer>
            {data?.result.activityTags.map((item: string, index: number) => {
              return <article key={index}>{item}</article>;
            })}
          </ActivityTagContainer>
        </TagContainer>
        <p>{data?.result.createdAt}</p>
      </DetailInfo>
      <DetailTitle>{data?.result.title}</DetailTitle>
      <WriterInfo userName={data?.result.userName} />
      {/* ! 지도 좌표 더미 데이터로 찍어보기 */}
      <PlaceMap placeList={dummyData} />
      <PlaceContainer>
        {data?.result.recordedPlaces.map((place: PlaceInformation, index: number) => {
          return (
            <PlaceList>
              <article key={index}>
                <p>{index + 1} </p>
                <h2>{place.placeName}</h2>
              </article>
              <div></div>
            </PlaceList>
          );
        })}
      </PlaceContainer>
      <DetailContent>
        {data?.result.record_content} <br />
      </DetailContent>
    </DetailContainer>
  );
};

export default Detail;

const DetailContainer = styled.section``;

const DetailHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2.2rem;
`;

const Icon = styled.img`
  width: 19.67px;
  height: 16.67px;
  cursor: pointer;
`;

const DetailInfo = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  p {
    color: ${({ theme }) => theme.colors.gray400};
    ${({ theme }) => theme.fonts.caption2};
  }
`;

const TagContainer = styled.section`
  display: flex;
`;

const MoodTagContainer = styled.article`
  display: flex;
  flex-direction: row;
  align-items: center;

  article {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4.8rem;
    height: 2.2rem;
    background-color: rgba(247, 213, 78, 0.2);
    color: ${({ theme }) => theme.colors.mainDark};
    border-radius: 4px;
    ${({ theme }) => theme.fonts.caption2};
    margin-right: 0.6rem;
  }
`;

const ActivityTagContainer = styled(MoodTagContainer)`
  article {
    background-color: ${({ theme }) => theme.colors.greenLight};
    color: ${({ theme }) => theme.colors.greenDark};
  }
`;

const PlaceContainer = styled.section`
  section {
    &:last-child {
      div {
        display: none;
      }
    }
  }
`;

const PlaceList = styled.section`
  article {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  p {
    width: 16px;
    height: 16px;
    margin-right: 12px;
    background-color: ${({ theme }) => theme.colors.main900};
    color: ${({ theme }) => theme.colors.gray100};
    ${({ theme }) => theme.fonts.caption1};
    font-size: 0.8rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h2 {
    color: ${({ theme }) => theme.colors.gray900};
    ${({ theme }) => theme.fonts.body4};
  }

  div {
    border: 1px solid rgb(224, 224, 224);
    width: 0px;
    height: 12px;
    margin-left: 7.7px;
    position: relative;
  }
`;

const DetailTitle = styled.h1`
  margin-top: 1.6rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.gray900};
  ${({ theme }) => theme.fonts.heading2};
`;

const DetailContent = styled.p`
  color: ${({ theme }) => theme.colors.gray700};
  ${({ theme }) => theme.fonts.body2};
  margin-top: 16px;
`;
