import styled from 'styled-components';
import { useState } from 'react';
import closeIcon from '../assets/icons/close.svg';
import HorizontalLine from '../components/post/HorizontalLine';
import DatePicker from '../components/post/DatePicker';
import Margin from '../components/main/Margin';
import KeywordPlaceSearch from 'components/post/KeywordPlaceSearch';
import { IHashtag, IRecord, IRecordedPlace } from 'types/post';
import { selectedTagsState } from '\brecoil/atoms/selectedTagsState';
import { useRecoilValue } from 'recoil';

const Post = () => {
  const hashtags = useRecoilValue<IHashtag[]>(selectedTagsState);
  /* TODO: http request 보낸 후 setHashtags([])로 전역 selectedTagsState 초기화 */
  // const [hashtags, setHashtags] = useRecoilState<IHashtag[]>(selectedTagsState);

  const [places, setPlaces] = useState<IRecordedPlace[]>([]);
  const [recordData, setRecordData] = useState<IRecord>({
    userName: 'minhee',
    title: '',
    dateDate: new Date().toLocaleString(),
    recordedContent: '',
    exposure: 'OPEN',
    hashtags: hashtags,
    recordedPlaces: places,
  });

  console.log('places', places);
  return (
    <>
      <HeaderLayout>
        <Header>글 작성</Header>
        <CloseIcon src={closeIcon} alt="닫기 버튼" />
      </HeaderLayout>
      <TitleInput
        placeholder="제목을 입력해주세요"
        value={recordData.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setRecordData((prevState) => {
            return {
              ...prevState,
              title: e.target.value,
            };
          });
        }}
      />
      <HorizontalLine />
      <DatePicker dateDate={recordData.dateDate} setRecordData={setRecordData} />
      <Margin />
      <KeywordPlaceSearch setPlaces={setPlaces} />
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
