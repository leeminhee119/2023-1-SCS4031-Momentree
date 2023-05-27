import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { useCommunityDetailQuery } from 'hooks/queries/useCommunityDetail';
import closeIcon from '../assets/icons/close.svg';
import backIcon from '../assets/icons/back.svg';
import HorizontalLine from '../components/post/HorizontalLine';
import DatePicker from '../components/post/DatePicker';
import Margin from '../components/main/Margin';
import Map from 'components/common/Map';
import KeywordPlaceSearch from 'components/post/KeywordPlaceSearch';
import SaveButton from 'components/common/SaveButton';
import { useEffect, useState } from 'react';
import { IEditMainPost, IEditPlaceContent } from 'types/editPost';
import { useEditMainMutation, useEditPlaceContentMutation } from 'hooks/queries/useEditPost';
import { useRecoilState } from 'recoil';
import { recordedPlacesState } from '\brecoil/atoms/recordedPlacesState';
import { PlaceInformation } from 'types/placeInformation';
import { IRecordedPlace } from 'types/post';

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(['user']);
  const token = cookies?.user?.userToken;
  const { data } = useCommunityDetailQuery(Number(postId), token);

  const [isSaveActive, setIsSaveActive] = useState<boolean>(false);
  const [places, setPlaces] = useRecoilState(recordedPlacesState);
  //   const [oriPlaces, setOriPlaces] = useState([]);
  const [newRecordMain, setNewRecordMain] = useState<IEditMainPost>({});

  // 본문 수정 API
  const editPostMain = useEditMainMutation(Number(postId), newRecordMain, token, () => {
    navigate('/');
  });

  // 장소 후기 수정 API
  const newPlacesContents: IEditPlaceContent[] = [];
  useEffect(() => {
    places.forEach((place: IRecordedPlace) => {
      if (place.placeId && place.newPlaceContent) {
        newPlacesContents.push({
          placeId: place.placeId,
          newPlaceContent: place.newPlaceContent,
        });
      }
    });
  }, [places]);
  const editPostPlaceContent = useEditPlaceContentMutation(Number(postId), newPlacesContents, token);

  useEffect(() => {
    if (data?.result.recordedPlaces) {
      //   setOriPlaces(data?.result.recordedPlaces);
      setPlaces(() => {
        const newPlaces: IRecordedPlace[] = [];
        data?.result.recordedPlaces.forEach((place: PlaceInformation) => {
          newPlaces.push({
            placeId: place.placeId,
            orders: place.orders,
            placeName: place.placeName,
            placeContent: place.placeContent,
            address: place.address,
            addressGu: place.addressGu,
            addressX: place.addressX,
            addressY: place.addressY,
            images: place.placeImages,
          });
        });
        return newPlaces;
      });
    }
    setIsSaveActive(true);
  }, [data]);
  return (
    <PostLayout>
      <PostBox>
        <HeaderLayout>
          <button onClick={() => navigate(`/selectTags`)}>
            <BackIcon src={backIcon} alt="뒤로가기 버튼" />
          </button>
          <Header>글 작성</Header>
          <button>
            <CloseIcon src={closeIcon} alt="닫기 버튼" />
          </button>
        </HeaderLayout>
        <TitleInput
          placeholder="제목을 입력해주세요"
          defaultValue={data?.result.title}
          onChange={(event) => {
            setNewRecordMain((prevState) => {
              return {
                ...prevState,
                title: event.target.value,
              };
            });
          }}
        />
        <HorizontalLine />
        <DatePicker dateDate={data?.result.dateDate} newDate={newRecordMain.dateDate} setNewDate={setNewRecordMain} />
        <Margin />
        <Map isEdit={true} places={places} />
        <KeywordPlaceSearch />
        <Margin />
        <ContentTextBox
          placeholder="오늘 데이트가 어땠는지 알려주세요"
          defaultValue={data?.result.recordContent}
          onChange={(event) => {
            setNewRecordMain((prevState) => {
              return {
                ...prevState,
                recordedContent: event.target.value,
              };
            });
          }}
        />
      </PostBox>
      <SaveButton
        isActive={isSaveActive}
        handleClickSave={() => {
          editPostMain.mutate();
          newPlacesContents.length > 0 ? editPostPlaceContent.mutate() : null; // newPlaceContent가 있는 경우
        }}
      />
    </PostLayout>
  );
};
export default EditPost;

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
