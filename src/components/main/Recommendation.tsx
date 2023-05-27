import styled from 'styled-components';
import RecommendationItem from './RecommendationItem';
import { useNavigate } from 'react-router-dom';
import { useRecommendQuery } from '../../hooks/queries/useRecommend';
import { CommunityData } from 'types/communityData';
import { useCookies } from 'react-cookie';

const RecommendationContainer = styled.section`
  display: flex;
  flex-direction: column;
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

  const { data } = useRecommendQuery(cookies?.user?.userToken);
  const content = data?.result || [];

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
              }}>
              <RecommendationItem
                recordedId={data?.recordedId}
                title={data.title}
                bookMarkStatus={data.bookMarkStatus}
                likeCnt={data.likeCnt}
                bookmarkCnt={data.bookMarkCnt}
                place={data.recordedPlaces}
                key={index}></RecommendationItem>
            </div>
          );
        })}
      </RecommendationSlider>
    </RecommendationContainer>
  );
};

export default Recommendation;
