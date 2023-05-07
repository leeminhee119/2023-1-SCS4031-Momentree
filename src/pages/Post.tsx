import styled from 'styled-components';
import { useEffect, useState } from 'react';
import closeIcon from '../assets/icons/close.svg';
import HorizontalLine from '../components/post/HorizontalLine';
import DatePicker from '../components/post/DatePicker';
import Margin from '../components/main/Margin';
import KeywordPlaceSearch from 'components/post/KeywordPlaceSearch';
import SaveButton from 'components/post/SaveButton';
import { IHashtag, IRecord, IRecordedPlace } from 'types/post';
import { selectedTagsState } from '\brecoil/atoms/selectedTagsState';
import { useRecoilState } from 'recoil';
import { recordedPlacesState } from '\brecoil/atoms/recordedPlacesState';

const Post = () => {
  const [hashtags, setHashtags] = useRecoilState<IHashtag[]>(selectedTagsState);
  const [places, setPlaces] = useRecoilState<IRecordedPlace[]>(recordedPlacesState);

  const [recordData, setRecordData] = useState<IRecord>({
    userName: 'minhee',
    title: '',
    dateDate: new Date().toLocaleDateString(),
    recordedContent: '',
    exposure: 'OPEN',
    hashtags: hashtags,
    recordedPlaces: places,
  });

  const [isSaveActive, setIsSaveActive] = useState<boolean>(false);

  // places가 변경될 때마다 recordData.recordedPlaces 업데이트
  useEffect(() => {
    setRecordData((prevRecordData: IRecord) => ({
      ...prevRecordData,
      recordedPlaces: places,
    }));
  }, [places]);

  useEffect(() => {
    if (recordData.title !== '' && recordData.recordedPlaces.length !== 0) {
      setIsSaveActive(true);
    } else {
      setIsSaveActive(false);
    }
  }, [recordData]);

  async function handleClickSave() {
    console.log('await');
    try {
      const response = await fetch('3.39.153.141/community', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recordData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      } else {
        // 초기화
        setHashtags([]);
        setPlaces([]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  console.log('places', places);
  console.log('recordData', recordData);

  function handleChangeTitle(event: React.ChangeEvent<HTMLInputElement>) {
    setRecordData((prevState) => {
      return {
        ...prevState,
        recordedContent: event.target.value,
      };
    });
  }
  function handleChangeContent(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setRecordData((prevState) => {
      return {
        ...prevState,
        recordedContent: event.target.value,
      };
    });
  }

  return (
    <PostLayout>
      <PostBox>
        <HeaderLayout>
          <Header>글 작성</Header>
          <CloseIcon src={closeIcon} alt="닫기 버튼" />
        </HeaderLayout>
        <TitleInput placeholder="제목을 입력해주세요" value={recordData.title} onChange={handleChangeTitle} />
        <HorizontalLine />
        <DatePicker dateDate={recordData.dateDate} setRecordData={setRecordData} />
        <Margin />
        <KeywordPlaceSearch />
        <Margin />
        <ContentTextBox placeholder="오늘 데이트가 어땠는지 알려주세요" onChange={handleChangeContent} />
      </PostBox>
      <SaveButton isActive={isSaveActive} handleClickSave={handleClickSave} />
    </PostLayout>
  );
};

const PostLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
const PostBox = styled.div`
  height: 40%;
`;
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
const ContentTextBox = styled.textarea`
  width: 100%;
  height: 10rem;
  border: none;
  margin: 1rem 0;
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray400};
    ${({ theme }) => theme.fonts.body2}
  }
`;
export default Post;
