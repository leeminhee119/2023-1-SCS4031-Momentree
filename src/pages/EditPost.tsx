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
import { IEditMainPost, IEditPlaceContent, IEditPlaceOrder } from 'types/editPost';
import {
  useEditAddPlaceMutation,
  useEditDeletePlaceMutation,
  useEditMainMutation,
  useEditPlaceContentMutation,
  useEditPlaceOrderMutation,
} from 'hooks/queries/useEditPost';
import { useRecoilState, useRecoilValue } from 'recoil';
import { deletedPlacesState, recordedPlacesState } from '\brecoil/atoms/recordedPlacesState';
import { PlaceInformation } from 'types/placeInformation';
import { IRecordedPlace } from 'types/post';

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(['user']);
  const token = cookies?.user?.userToken;
  const { data, isLoading, isFetching } = useCommunityDetailQuery(Number(postId), token);

  const [isSaveActive, setIsSaveActive] = useState<boolean>(false);
  const [places, setPlaces] = useRecoilState(recordedPlacesState);
  const deletedPlaces = useRecoilValue(deletedPlacesState);
  const [newRecordMain, setNewRecordMain] = useState<IEditMainPost>({});

  useEffect(() => {
    if (data?.result.recordedPlaces) {
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

  /* 본문 수정 API */
  const editPostMain = useEditMainMutation(Number(postId), newRecordMain, token, () => {
    navigate('/');
  });

  /* 장소 관련 수정 API */
  const [newPlacesContents, setNewPlacesContents] = useState<IEditPlaceContent[]>([]); // API에 보낼 데이터 (장소 후기 수정 사항)
  const [newPlacesOrders, setNewPlacesOrders] = useState<IEditPlaceOrder[]>([]); // API에 보낼 데이터 (장소 순서 수정 사항)
  const [newPlaces, setNewPlaces] = useState<IRecordedPlace[]>([]); // API에 보낼 데이터 (장소 추가 사항)
  const [deletedPlaceIds, setDeletedPlaceIds] = useState<(number | undefined)[]>([]);
  useEffect(() => {
    const newPlacesContentsUpdates: IEditPlaceContent[] = [];
    const newPlacesOrdersUpdates: IEditPlaceOrder[] = [];
    const newPlacesUpdates: IRecordedPlace[] = [];
    const deletedPlaceIdsUpdates = [...deletedPlaces];
    places.forEach((place: IRecordedPlace) => {
      if (place.placeId) {
        // 기존에 있던 장소의 경우

        if (place.newPlaceContent) {
          // 수정한 장소 후기가 있는 경우
          newPlacesContentsUpdates.push({
            placeId: place.placeId,
            newPlaceContent: place.newPlaceContent,
          });
        }
        if (place.newOrders) {
          // 수정한 장소 순서가 있는 경우
          newPlacesOrdersUpdates.push({
            placeId: place.placeId,
            newOrders: place.newOrders,
          });
        }
      } else {
        // 수정하면서 새로 장소를 추가한 경우
        newPlacesUpdates.push(place);
      }
    });
    setNewPlacesContents(newPlacesContentsUpdates);
    setNewPlacesOrders(newPlacesOrdersUpdates);
    setNewPlaces(newPlacesUpdates);
    setDeletedPlaceIds(deletedPlaceIdsUpdates);
  }, [places]);
  const editPostPlaceContent = useEditPlaceContentMutation(Number(postId), newPlacesContents, token);
  const editPostPlaceOrder = useEditPlaceOrderMutation(Number(postId), newPlacesOrders, token);
  const editPostAdd = useEditAddPlaceMutation(Number(postId), newPlaces, token);
  const editPostDeletePlace = useEditDeletePlaceMutation(Number(postId), deletedPlaceIds, token);

  if (isLoading || isFetching) {
    // data 모두 불러올 때까지
    return <>잠시만 기다려주세요.</>;
  }
  return (
    <PostLayout>
      <PostBox>
        <HeaderLayout>
          <button onClick={() => navigate(-1)}>
            <BackIcon src={backIcon} alt="뒤로가기 버튼" />
          </button>
          <Header>글 수정</Header>
          <button onClick={() => navigate(-1)}>
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
        <KeywordPlaceSearch isEdit={true} />
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
        label="수정 완료"
        isActive={isSaveActive}
        handleClickSave={async () => {
          try {
            await Promise.all([
              Object.keys(newRecordMain).length > 0 ? editPostMain.mutateAsync() : Promise.resolve(),
              newPlacesContents.length > 0 ? editPostPlaceContent.mutateAsync() : Promise.resolve(),
              newPlacesOrders.length > 0 ? editPostPlaceOrder.mutateAsync() : Promise.resolve(),
              newPlaces.length > 0 ? editPostAdd.mutateAsync() : Promise.resolve(),
              deletedPlaceIds.length > 0 ? editPostDeletePlace.mutateAsync() : Promise.resolve(),
            ]);
            navigate(`/`);
          } catch (error) {
            console.error(error);
          }
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
