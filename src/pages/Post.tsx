import styled from 'styled-components';
import { useState } from 'react';
import closeIcon from '../assets/icons/close.svg';
import HorizontalLine from '../components/post/HorizontalLine';
import DatePicker from '../components/post/DatePicker';
import Margin from 'components/main/Margin';

const Post = () => {
  const [dateDate, setDateDate] = useState<Date>(new Date());
  const [title, setTitle] = useState('');

  return (
    <>
      <HeaderLayout>
        <Header>글 작성</Header>
        <CloseIcon src={closeIcon} />
      </HeaderLayout>
      <TitleInput
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value);
        }}
      />
      <HorizontalLine />
      <DatePicker dateDate={dateDate} setDateDate={setDateDate} />
      <Margin />
    </>
  );
};

const HeaderLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4.4rem;
`;
const Header = styled.div`
  ${({ theme }) => theme.fonts.suubtitle1};
`;
const CloseIcon = styled.img`
  width: 2rem;
`;
const TitleInput = styled.input`
  ${({ theme }) => theme.fonts.body2};
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray400};
  }
  border: none;
  padding: 0;
  height: 5rem;
`;

export default Post;
