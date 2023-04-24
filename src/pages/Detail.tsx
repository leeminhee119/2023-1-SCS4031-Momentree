import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const { postId } = useParams();

  return (
    <DeatilContainer>
      게시글 상세보기 페이지
      {postId}번째 게시물
    </DeatilContainer>
  );
};

export default Detail;

const DeatilContainer = styled.section``;
