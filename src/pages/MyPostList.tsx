import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import leftIcon from '../assets/icons/left.svg';
import PostItem from 'components/common/PostMainItem';
import { useMyPostListQuery } from 'hooks/queries/useMyPage';
import { useRecoilValue } from 'recoil';
import { userState } from '\brecoil/atoms/userState';
import { CommunityData } from 'types/communityData';

const MyPostList = () => {
  const navigate = useNavigate();
  const token = useRecoilValue(userState).token;
  const { data } = useMyPostListQuery(token);

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
      {data?.result.content.map((data: CommunityData, index: number) => {
        return (
          <div
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
              key={index}></PostItem>
          </div>
        );
      })}
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
