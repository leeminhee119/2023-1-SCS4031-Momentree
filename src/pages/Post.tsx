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
import { selectedTagsState } from '\brecoil/atoms/selectedTagsState';
import { useRecoilState } from 'recoil';
import { recordedPlacesState } from '\brecoil/atoms/recordedPlacesState';

const Post = () => {
  const navigate = useNavigate();
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
      const response = await fetch('http://3.39.153.141/community', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6InRlc3QwMiIsIm5hbWUiOiLsubTtjpjsl6ztlonrn6wiLCJpYXQiOjE2ODM1MjMwOTcsImV4cCI6MTY4NjExNTA5N30.MdRtV8YRmwdc6ZEgSR41qxvA723xkSRo8XipM_9dEEQ',
        },
        body: JSON.stringify(recordData),
      });
      navigate(`/`);
      window.location.reload();
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
  function handleClickBack() {
    navigate(`/selectTags`);
  }

  console.log('places', places);
  console.log('recordData', recordData);
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
        <KeywordPlaceSearch />
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

export default Post;
