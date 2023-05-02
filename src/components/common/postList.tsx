import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import unclickbookmarkIcon from '../../assets/icons/unclickbookmark.svg';
import clickbookmarkIcon from '../../assets/icons/clickbookmark.svg';
import heartIcon from '../../assets/icons/heart.svg';
import bookmarkIcon from '../../assets/icons/bookmark.svg';

const PostList = () => {
  const navigate = useNavigate();
  const PostData = [
    {
      recordedId: 6,
      title: '즐거운 여행',
      record_content: '너무 즐거웠어요',
      bookMarkStatus: true,
      likeStatus: false,
      likeCnt: 134,
      bookmarkCnt: 13,
      place: ['강남구', '서초구'],
      vibeTag: ['편안함', '힐링'],
      activityTag: ['공원', '산책'],
    },
    {
      recordedId: 7,
      title: '남산 데이트 코스',
      record_content: '너무 즐거웠어요',
      bookMarkStatus: false,
      likeStatus: false,
      likeCnt: 203,
      bookmarkCnt: 34,
      place: ['중구'],
      vibeTag: ['활기찬', '즐거운', '신나는'],
      activityTag: ['테마파크', '식사'],
    },
  ];
  return (
    <PostListContainer>
      {PostData.map((data, index) => {
        return (
          <PostContainer onClick={() => navigate(`/post/${data.recordedId}`)} key={index}>
            <Map></Map>
            {data.bookMarkStatus ? (
              <BookmarkIcon src={clickbookmarkIcon} alt="북마크 한 아이콘" />
            ) : (
              <BookmarkIcon src={unclickbookmarkIcon} alt="북마크 하지 않은 아이콘" />
            )}
            <h1>{data.title}</h1>
            <PlaceContainer>
              {data.place.map((item, index) => {
                return <article key={index}>{item}</article>;
              })}
            </PlaceContainer>
            <PostItemInfo>
              <div>
                <MoodTagContainer>
                  {data.vibeTag.map((item, index) => {
                    return <article key={index}>{item}</article>;
                  })}
                </MoodTagContainer>
                <ActivityTagContainer>
                  {data.activityTag.map((item, index) => {
                    return <article key={index}>{item}</article>;
                  })}
                </ActivityTagContainer>
              </div>

              <IconContainer>
                <Icon src={heartIcon} alt="좋아요 아이콘" /> <p>{data.likeCnt}</p>
                <Icon src={bookmarkIcon} alt="북마크 아이콘" /> <p>{data.bookmarkCnt}</p>
              </IconContainer>
            </PostItemInfo>
          </PostContainer>
        );
      })}
    </PostListContainer>
  );
};

export default PostList;

const PostListContainer = styled.section`
  margin-top: 1.6rem;
`;

const PostContainer = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  margin-bottom: 2rem;
  cursor: pointer;

  h1 {
    color: ${({ theme }) => theme.colors.gray900};
    ${({ theme }) => theme.fonts.body1};
    margin-bottom: 1.2rem;
  }
`;

const Map = styled.article`
  width: 100%;
  height: 16rem;

  background-color: ${({ theme }) => theme.colors.gray500};
  border-radius: 4px;
  margin-bottom: 1.2rem;
`;

const BookmarkIcon = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 1.175rem;
  margin-top: 0.925rem;
  z-index: 1;
  color: rgb(79, 91, 102);
  cursor: pointer;
`;

const Icon = styled.img``;

const PostItemInfo = styled.article`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.6rem;
`;

const PlaceContainer = styled.article`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.6rem;

  article {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.gray600};
    ${({ theme }) => theme.fonts.body4};
    margin-right: 0.6rem;
  }
`;

const MoodTagContainer = styled.article`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.6rem;

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

const IconContainer = styled.article`
  display: flex;
  flex-direction: row;
  align-items: center;

  p {
    color: ${({ theme }) => theme.colors.gray900};
    ${({ theme }) => theme.fonts.caption2};
    margin-right: 1.225rem;
    margin-bottom: 0;
  }

  img {
    margin-right: 0.4rem;
  }
`;
