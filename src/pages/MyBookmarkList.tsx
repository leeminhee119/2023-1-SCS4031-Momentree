import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import leftIcon from '../assets/icons/left.svg';
import PostList from 'components/common/postList';

const MyBookmarkList = () => {
  const navigate = useNavigate();
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
      <PostList />
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
