import styled from 'styled-components';
import RecommendationItem from './RecommendationItem';

const Recommendation = () => {
  const Recommendations = [
    {
      title: '힙지로 데이트',
      bookMarkStatus: false,
      likeCnt: 134,
      bookmarkCnt: 13,
    },
    {
      title: '강남 데이트 추천',
      bookMarkStatus: true,
      likeCnt: 300,
      bookmarkCnt: 45,
    },
    {
      title: '롯데월드 데이트',
      bookMarkStatus: true,
      likeCnt: 176,
      bookmarkCnt: 22,
    },
    {
      title: '뚝섬 데이트',
      bookMarkStatus: false,
      likeCnt: 143,
      bookmarkCnt: 12,
    },
  ];

  return (
    <RecommendationContainer>
      <RecommendationContainerTitle>당신을 위한 추천 코스</RecommendationContainerTitle>
      <RecommendationSlider>
        {Recommendations.map((data, index) => {
          return (
            <RecommendationItem
              title={data.title}
              bookMarkStatus={data.bookMarkStatus}
              likeCnt={data.likeCnt}
              bookmarkCnt={data.bookmarkCnt}
              key={index}></RecommendationItem>
          );
        })}
      </RecommendationSlider>
    </RecommendationContainer>
  );
};

export default Recommendation;

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
