import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import leftIcon from '../assets/icons/left.svg';
import PostItem from 'components/common/PostMainItem';

const MyBookmarkList = () => {
  const navigate = useNavigate();
  const PostData = [
    {
      recordedId: 123,
      title: '충무로 데이트 코스',
      record_content: '너무 즐거웠어요',
      bookMarkStatus: true,
      likeStatus: false,
      likeCnt: 134,
      bookmarkCnt: 13,
      place: ['중구'],
      vibeTag: [{ tagName: '맛집' }],
      activityTag: [{ tagName: '맛집' }],
    },
    {
      recordedId: 7,
      title: '롯데월드 코스',
      record_content: '무지개 분수 최고',
      bookMarkStatus: true,
      likeStatus: false,
      likeCnt: 203,
      bookmarkCnt: 34,
      place: ['서초구', '강남구'],
      vibeTag: [{ tagName: '맛집' }],
      activityTag: [{ tagName: '맛집' }],
    },
    {
      recordedId: 183,
      title: '종로 코스',
      record_content: '창덕궁, 경복궁',
      bookMarkStatus: true,
      likeStatus: false,
      likeCnt: 203,
      bookmarkCnt: 34,
      place: ['광하문로', '강남구'],
      vibeTag: [{ tagName: '맛집' }],
      activityTag: [{ tagName: '맛집' }],
    },
  ];

  return (
    <MyBookmarkListContainer>
      <MyBookmarkListHeader>
        <Icon
          src={leftIcon}
          alt="뒤로가기 아이콘"
          onClick={() => {
            navigate(-1);
          }}
        />
        <h1>나의 북마크</h1>
      </MyBookmarkListHeader>
      {PostData.map((data, index) => {
        return (
          <div onClick={() => navigate(`/post/${data.recordedId}`)}>
            <PostItem
              title={data.title}
              bookMarkStatus={data.bookMarkStatus}
              likeCnt={data.likeCnt}
              bookmarkCnt={data.bookmarkCnt}
              vibeTag={data.vibeTag}
              activityTag={data.activityTag}
              // place={data.place}
              recordedId={data.recordedId}
              key={index}></PostItem>
          </div>
        );
      })}
    </MyBookmarkListContainer>
  );
};

export default MyBookmarkList;

const MyBookmarkListContainer = styled.section`
  h1 {
    color: ${({ theme }) => theme.colors.gray900};
    ${({ theme }) => theme.fonts.heading2};
  }
`;

const MyBookmarkListHeader = styled.article`
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
