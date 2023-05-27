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
import { IEditMainPost } from 'types/editPost';
import { useEditMainMutation } from 'hooks/queries/useEditPost';

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(['user']);
  const token = cookies?.user?.userToken;
  const { data } = useCommunityDetailQuery(Number(postId), token);

  const [isSaveActive, setIsSaveActive] = useState<boolean>(false);
  const [oriPlaces, setOriPlaces] = useState([]);

  const [newRecordMain, setNewRecordMain] = useState<IEditMainPost>({});

  const editPostMainMutation = useEditMainMutation(Number(postId), newRecordMain, token, () => {
    navigate('/');
  });
  useEffect(() => {
    if (data?.result.recordedPlaces) {
      setOriPlaces(data?.result.recordedPlaces);
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
        <Map places={oriPlaces} />
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
          editPostMainMutation.mutate();
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
