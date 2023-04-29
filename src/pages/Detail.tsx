import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import clickbookmarkIcon from '../assets/icons/clickbookmark.svg';
import heartIcon from '../assets/icons/heart.svg';
import fillheartIcon from '../assets/icons/fillheart.svg';
import bookmarkIcon from '../assets/icons/bookmark.svg';
import leftIcon from '../assets/icons/left.svg';
import WriterInfo from 'components/detail/WriterInfo';

const Detail = () => {
  const { postId } = useParams();
  const [ishearted, setIshearted] = useState<boolean>(true);
  const [isbookmarked, setIsbookmarked] = useState<boolean>(false);
  const navigate = useNavigate();

  const CommunityData = [
    {
      recordedId: 6,
      title: '충무로에서 즐거운 데이트',
      record_content: '너무 즐거웠어요',
      bookMarkStatus: true,
      likeStatus: false,
      likeCnt: 134,
      bookmarkCnt: 13,
      place: ['강남구', '서초구'],
      vibeTag: ['편안함', '즐거운', '신나는'],
      activityTag: ['카페', '식사'],
      createdAt: '2023-04-23',
    },
  ];

  return (
    <DeatilContainer>
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
            {CommunityData[0].vibeTag.map((item, index) => {
              return <article key={index}>{item}</article>;
            })}
          </MoodTagContainer>
          <ActivityTagContainer>
            {CommunityData[0].activityTag.map((item, index) => {
              return <article key={index}>{item}</article>;
            })}
          </ActivityTagContainer>
        </TagContainer>
        <p>{CommunityData[0].createdAt}</p>
      </DetailInfo>
      <DetailTitle>{CommunityData[0].title}</DetailTitle>
      <WriterInfo />
      <DetialContent>
        {CommunityData[0].record_content} 게시글 아이디 {postId}
      </DetialContent>
    </DeatilContainer>
  );
};

export default Detail;

const DeatilContainer = styled.section``;

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

const DetailTitle = styled.h1`
  margin-top: 1.6rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.gray900};
  ${({ theme }) => theme.fonts.heading2};
`;

const DetialContent = styled.p`
  color: ${({ theme }) => theme.colors.gray700};
  ${({ theme }) => theme.fonts.body2};
  margin-top: 16px;
`;
