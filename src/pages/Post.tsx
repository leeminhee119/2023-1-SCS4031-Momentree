/* eslint-disable @typescript-eslint/no-misused-promises */
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import closeIcon from '../assets/icons/close.svg';
import backIcon from '../assets/icons/back.svg';
import HorizontalLine from '../components/post/HorizontalLine';
import DatePicker from '../components/post/DatePicker';
import Margin from '../components/main/Margin';
import Map from 'components/common/Map';
import KeywordPlaceSearch from 'components/post/KeywordPlaceSearch';
import SaveButton from 'components/common/SaveButton';
import { IHashtag, IImage, IRecord, IRecordedPlace } from 'types/post';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedTagsState } from '\brecoil/atoms/selectedTagsState';
import { recordedPlacesState } from '\brecoil/atoms/recordedPlacesState';
import { recordState } from '\brecoil/atoms/recordState';
import { usePostMutation } from 'hooks/queries/usePost';
import { useResetRecoilState } from 'recoil';
import { useCookies } from 'react-cookie';
const Post = () => {
  const navigate = useNavigate();
  // 로그인한 유저 토큰 값 불러오기
  const [cookies] = useCookies(['user']);

  const hashtags = useRecoilValue<IHashtag[]>(selectedTagsState);
  const places = useRecoilValue<IRecordedPlace[]>(recordedPlacesState);
  const [recordData, setRecordData] = useRecoilState<IRecord>(recordState);

  const resetHashtags = useResetRecoilState(selectedTagsState);
  const resetPlaces = useResetRecoilState(recordedPlacesState);
  const resetRecord = useResetRecoilState(recordState);

  const postMutation = usePostMutation(recordData, cookies?.user?.userToken, function () {
    // API post 후 success 콜백
    // recoil atom 초기화
    resetHashtags();
    resetPlaces();
    resetRecord();
    navigate(`/`);
  });

  const [isSaveActive, setIsSaveActive] = useState<boolean>(false);
  function getBase64(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function () {
        // Get base64 string
        const base64 = reader.result as string;
        resolve(base64);
      };
      reader.onerror = function () {
        reject(new Error('Error reading file'));
      };
      reader.readAsDataURL(file);
    });
  }

  useEffect(() => {
    const copyPlaces = places.map((place) => ({
      ...place,
      images: place.images.map((image: IImage) => ({
        ...image,
        imgFile: image.imgFile
          ? new File([image.imgFile], image.imgFile.name, { type: image.imgFile.type })
          : undefined,
      })),
    }));
    const promises: Promise<any>[] = [];

    copyPlaces.forEach((place: IRecordedPlace, placeIdx: number) => {
      place.images.forEach((imgObj: IImage, imgIdx: number) => {
        const copyImgObj = { ...imgObj };

        if (copyImgObj.imgFile instanceof File) {
          const promise = getBase64(copyImgObj.imgFile)
            .then((base64) => {
              copyImgObj.imgFormData = base64.replace(/^data:image\/[a-z]+;base64,/, '');
              copyImgObj.fileName = copyImgObj.imgFile?.name;
              copyImgObj.contentType = copyImgObj.imgFile?.type;
              delete copyImgObj.imgFile;
              return { placeIdx, imgIdx, imgObj: copyImgObj };
            })
            .catch((err) => console.log(err));
          promises.push(promise);
        }
      });
    });

    Promise.all(promises)
      .then((result) => {
        result.forEach(({ placeIdx, imgIdx, imgObj }) => {
          copyPlaces[placeIdx].images[imgIdx] = imgObj;
        });
        setRecordData((prevRecordData: IRecord) => ({
          ...prevRecordData,
          hashtags: hashtags,
          recordedPlaces: copyPlaces,
        }));
      })
      .catch((err) => console.log(err));
  }, [places]);

  useEffect(() => {
    if (recordData.title !== '' && recordData.recordedPlaces.length !== 0) {
      setIsSaveActive(true);
    } else {
      setIsSaveActive(false);
    }
  }, [recordData]);

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
          <button onClick={() => navigate(`/selectTags`)}>
            <BackIcon src={backIcon} alt="뒤로가기 버튼" />
          </button>
          <Header>글 작성</Header>
          <button onClick={() => navigate(`/`)}>
            <CloseIcon src={closeIcon} alt="닫기 버튼" />
          </button>
        </HeaderLayout>
        <TitleInput placeholder="제목을 입력해주세요" defaultValue={recordData.title} onChange={handleChangeTitle} />
        <HorizontalLine />
        <DatePicker dateDate={recordData.dateDate} setRecordData={setRecordData} />
        <Margin />
        <Map places={places} />
        <KeywordPlaceSearch />
        <Margin />
        <ContentTextBox
          placeholder="오늘 데이트가 어땠는지 알려주세요"
          defaultValue={recordData.recordedContent}
          onChange={handleChangeContent}
        />
      </PostBox>
      <SaveButton
        isActive={isSaveActive}
        handleClickSave={() => {
          postMutation.mutate();
        }}
      />
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
