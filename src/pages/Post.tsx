/* eslint-disable @typescript-eslint/no-misused-promises */
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import closeIcon from '../assets/icons/close.svg';
import backIcon from '../assets/icons/back.svg';
import HorizontalLine from '../components/post/HorizontalLine';
import DatePicker from '../components/post/DatePicker';
import Margin from '../components/main/Margin';
import KeywordPlaceSearch from 'components/post/KeywordPlaceSearch';
import SaveButton from 'components/post/SaveButton';
import { IHashtag, IRecord, IRecordedPlace } from 'types/post';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedTagsState } from '\brecoil/atoms/selectedTagsState';
import { recordedPlacesState } from '\brecoil/atoms/recordedPlacesState';
import { recordState } from '\brecoil/atoms/recordState';
import { useResetRecoilState } from 'recoil';

const Post = () => {
  const navigate = useNavigate();
  const hashtags = useRecoilValue<IHashtag[]>(selectedTagsState);
  const places = useRecoilValue<IRecordedPlace[]>(recordedPlacesState);
  const [recordData, setRecordData] = useRecoilState<IRecord>(recordState);

  const resetHashtags = useResetRecoilState(selectedTagsState);
  const resetPlaces = useResetRecoilState(recordedPlacesState);
  const resetRecord = useResetRecoilState(recordState);

  const [isSaveActive, setIsSaveActive] = useState<boolean>(false);

  // places가 KeywordPlaceSearch에서 변경될 때마다 recordData.recordedPlaces 업데이트
  // 선택한 해시태그 recordData.hashtags에 업데이트
  useEffect(() => {
    setRecordData((prevRecordData: IRecord) => ({
      ...prevRecordData,
      hashtags: hashtags,
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
    await fetch('http://3.39.153.141/community', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6InRlc3QwMiIsIm5hbWUiOiLsubTtjpjsl6ztlonrn6wiLCJpYXQiOjE2ODM1MjMwOTcsImV4cCI6MTY4NjExNTA5N30.MdRtV8YRmwdc6ZEgSR41qxvA723xkSRo8XipM_9dEEQ',
      },
      body: JSON.stringify(recordData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        } else {
          // recoil atom 초기화
          resetHashtags();
          resetPlaces();
          resetRecord();
          navigate(`/`);
          window.location.reload();
        }
      })
      .catch((error) => console.log('error:', error));
  }
  function handleClickBack() {
    navigate(`/selectTags`);
  }

  console.log('places', places);
  console.log('recordData', recordData);

  function handleChangeTitle(event: React.ChangeEvent<HTMLInputElement>) {
    setRecordData((prevState) => {
      return {
        ...prevState,
        title: event.target.value,
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
          <button onClick={handleClickBack}>
            <BackIcon src={backIcon} alt="뒤로가기 버튼" />
          </button>
          <Header>글 작성</Header>
          <button>
            <CloseIcon src={closeIcon} alt="닫기 버튼" />
          </button>
        </HeaderLayout>
        <TitleInput placeholder="제목을 입력해주세요" defaultValue={recordData.title} onChange={handleChangeTitle} />
        <HorizontalLine />
        <DatePicker dateDate={recordData.dateDate} setRecordData={setRecordData} />
        <Margin />
        <KeywordPlaceSearch />
        <Margin />
        <ContentTextBox
          placeholder="오늘 데이트가 어땠는지 알려주세요"
          defaultValue={recordData.recordedContent}
          onChange={handleChangeContent}
        />
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
  ${({ theme }) => theme.fonts.subtitle1};
`;
const BackIcon = styled.img`
  width: 1.2rem;
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
