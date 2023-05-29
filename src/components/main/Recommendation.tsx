import styled from 'styled-components';
import RecommendationItem from './RecommendationItem';
import { useNavigate } from 'react-router-dom';
import heartIcon from '../../assets/icons/loadheart.svg';
import { CommunityData } from 'types/communityData';
import { useCookies } from 'react-cookie';
import { useQuery } from '@tanstack/react-query';
import { getRecommendList } from 'apis/main';
import theme from '../../styles/theme';

const RecommendationContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

const LodingContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 16.2rem;
  align-item: center;
`;

const LodingContainerTitle = styled.h1`
  margin-top: 2rem;
  margin-bottom: 1.6rem;
  text-align: left;
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.gray900};
`;

const LodingTextContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 8rem;
`;

const LodingText = styled.p`
  font: ${theme.fonts.caption4};
  color: ${theme.colors.gray600};
  text-align: center;
  margin: 0.3rem 0rem;
`;

const HeartIcon = styled.img`
  color: ${theme.colors.gray200};
  width: 2.2rem;
  height: 2.2rem;
  margin: 0.6rem;
`;

const RecommendationContainerTitle = styled.h1`
  margin-top: 2rem;
  margin-bottom: 1.6rem;
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.gray900};
`;

const RecommendationSlider = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: auto;
  white-space: nowrap;
`;

const Recommendation = () => {
  const [cookies] = useCookies(['user']);
  const navigate = useNavigate();

  const token = cookies?.user?.userToken;

  const { data, isLoading } = useQuery(['getRecommendList', token], () => getRecommendList(token), {
    enabled: !!token, // token이 존재할 때만 쿼리를 실행합니다.
  });

  const content = data?.result || [];

  if (!token || isLoading) {
    return (
      <LodingContainer>
        <LodingContainerTitle>당신을 위한 추천 코스</LodingContainerTitle>
        <LodingTextContainer>
          <HeartIcon src={heartIcon} alt="하트 아티콘"></HeartIcon>
          <LodingText>로그인 후 이용할 수 있는 서비스입니다.</LodingText>
        </LodingTextContainer>
      </LodingContainer>
    );
  }

  if (content.length === 0) {
    return (
      <LodingContainer>
        <LodingContainerTitle>당신을 위한 추천 코스</LodingContainerTitle>
        <LodingTextContainer>
          <HeartIcon src={heartIcon} alt="하트 아티콘"></HeartIcon>
          <LodingText>좋아요 및 북마크가 비어있네요!</LodingText>
          <LodingText>관심있는 게시글에 좋아요와 북마크를 표시해보세요.</LodingText>
        </LodingTextContainer>
      </LodingContainer>
    );
  }

  return (
    <RecommendationContainer>
      <RecommendationContainerTitle>당신을 위한 추천 코스</RecommendationContainerTitle>
      <RecommendationSlider>
        {content.map((data: CommunityData, index: number) => {
          return (
            <div
              onClick={() => {
                navigate(`/post/${data.recordedId}`);
                window.location.reload();
              }}
              key={index}>
              <RecommendationItem
                recordedId={data?.recordedId}
                title={data.title}
                bookMarkStatus={data.bookMarkStatus}
                likeCnt={data.likeCnt}
                bookmarkCnt={data.bookMarkCnt}
                place={data.recordedPlaces}
              />
            </div>
          );
        })}
      </RecommendationSlider>
    </RecommendationContainer>
  );
};

export default Recommendation;
