/* eslint-disable @typescript-eslint/no-misused-promises */
import styled from 'styled-components';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import clickbookmarkIcon from '../assets/icons/clickbookmark.svg';
import heartIcon from '../assets/icons/heart.svg';
import fillheartIcon from '../assets/icons/fillheart.svg';
import bookmarkIcon from '../assets/icons/bookmark.svg';
import leftIcon from '../assets/icons/left.svg';
import editIcon from '../assets/icons/pen.svg';
import deleteIcon from '../assets/icons/delete.svg';
import shareIcon from '../assets/icons/share.svg';
import WriterInfo from 'components/detail/WriterInfo';
import { useCommunityDetailQuery, usedeleteCommunityDetail } from 'hooks/queries/useCommunityDetail';
import { PlaceInformation } from 'types/placeInformation';
import ToastMessage from 'components/common/ToastMessage';
import { useCookies } from 'react-cookie';
import Map from 'components/detail/Map';
import { usePostBookmarkMutation, usePostLikekMutation } from 'hooks/queries/useUser';

const Detail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies] = useCookies(['user']);

  const body = {};
  const postBookmarkMutation = usePostBookmarkMutation(Number(postId), body, cookies?.user?.userToken);
  const postLikeMutation = usePostLikekMutation(Number(postId), body, cookies?.user?.userToken);
  const { mutate: handleClickDeleteButton } = usedeleteCommunityDetail(Number(postId), cookies?.user?.userToken);
  const [iscopyed, setIscopyed] = useState<boolean>(false);

  const { data } = useCommunityDetailQuery(Number(postId), cookies?.user?.userToken);
  const createdDate = new Date(data?.result.createdAt).toLocaleDateString();

  const deleteConfirmModal = () => {
    if (confirm('게시글을 정말 삭제하시겠습니까?')) {
      handleClickDeleteButton();
      navigate('/');
      window.location.reload();
    }
  };

  const handleCopyClipBoard = async () => {
    await navigator.clipboard
      // TODO base url 추가
      .writeText(`https://main.dj5b233u1e7ny.amplifyapp.com${location.pathname}`)
      .then(() => {
        setIscopyed(true);
        setTimeout(() => {
          setIscopyed(false);
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <DetailContainer>
      <DetailHeader>
        {iscopyed && <ToastMessage text="게시글 url을 복사했어요!" />}
        <Icon
          src={leftIcon}
          alt="뒤로가기 아이콘"
          onClick={() => {
            navigate('/');
            window.location.reload();
          }}
        />
        <div>
          {data?.result.likeStatus ? (
            <Icon
              src={fillheartIcon}
              alt="좋아요 한 아이콘"
              onClick={() => {
                cookies?.user?.userToken ? postLikeMutation.mutate() : navigate('/login');
              }}
            />
          ) : (
            <Icon
              src={heartIcon}
              alt="좋아요 하지 않은 아이콘"
              onClick={() => {
                cookies?.user?.userToken ? postLikeMutation.mutate() : navigate('/login');
              }}
            />
          )}
          {data?.result.bookMarkStatus ? (
            <Icon
              src={clickbookmarkIcon}
              alt="북마크 한 아이콘"
              onClick={() => {
                cookies?.user?.userToken ? postBookmarkMutation.mutate() : navigate('/login');
              }}
            />
          ) : (
            <Icon
              src={bookmarkIcon}
              alt="북마크 하지 않은 아이콘"
              onClick={() => {
                cookies?.user?.userToken ? postBookmarkMutation.mutate() : navigate('/login');
              }}
            />
          )}
          {data?.result.nickname === cookies?.user?.nickname && (
            <Icon
              src={editIcon}
              alt="수정 아이콘"
              onClick={() => {
                navigate('./edit');
              }}
            />
          )}
          {data?.result.nickname === cookies?.user?.nickname && (
            <Icon
              src={deleteIcon}
              alt="삭제 아이콘"
              onClick={() => {
                deleteConfirmModal();
              }}
            />
          )}
          <Icon src={shareIcon} alt="url 복사 아이콘" onClick={() => handleCopyClipBoard()} />
        </div>
      </DetailHeader>
      <DetailInfo>
        <TagContainer>
          <MoodTagContainer>
            {data?.result.vibeTags.map((item: { tagName: string }, index: number) => {
              return <article key={index}>{item.tagName}</article>;
            })}
          </MoodTagContainer>
          <ActivityTagContainer>
            {data?.result.activityTags.map((item: { tagName: string }, index: number) => {
              return <article key={index}>{item.tagName}</article>;
            })}
          </ActivityTagContainer>
        </TagContainer>
        <p>작성일 {createdDate}</p> <br />
        <p>데이트일 {data?.result.dateDate}</p>
      </DetailInfo>
      <DetailTitle>{data?.result.title}</DetailTitle>
      <WriterInfo
        profileImg={data?.result.profileImg}
        nickname={data?.result.nickname}
        recordCnt={data?.result.recordCnt}
        followerCnt={data?.result.followerCnt}
      />
      <MapLayout>
        <Map places={data?.result.recordedPlaces} />
      </MapLayout>
      <PlaceContainer>
        {data?.result.recordedPlaces.map((place: PlaceInformation, index: number) => {
          return (
            <PlaceList key={index}>
              <article key={index}>
                <p>{index + 1} </p>
                <h2>{place.placeName}</h2>
              </article>
              <div></div>
            </PlaceList>
          );
        })}
      </PlaceContainer>
      <DetailContent>
        {data?.result.recordContent} <br />
      </DetailContent>
    </DetailContainer>
  );
};

export default Detail;

const DetailContainer = styled.section``;

const DetailHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2.2rem;
`;

const Icon = styled.img`
  width: 19.67px;
  height: 16.67px;
  cursor: pointer;
`;

const DetailInfo = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;

  p {
    color: ${({ theme }) => theme.colors.gray400};
    ${({ theme }) => theme.fonts.caption2};
  }
`;

const TagContainer = styled.section`
  display: flex;
  margin-bottom: 0.5rem;
`;

const MoodTagContainer = styled.article`
  display: flex;
  flex-direction: row;
  align-items: center;

  article {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4.8rem;
    height: 2.2rem;
    background-color: rgba(247, 213, 78, 0.2);
    color: ${({ theme }) => theme.colors.mainDark};
    border-radius: 4px;
    ${({ theme }) => theme.fonts.caption2};
    margin-right: 0.6rem;
  }
`;

const ActivityTagContainer = styled(MoodTagContainer)`
  article {
    background-color: ${({ theme }) => theme.colors.greenLight};
    color: ${({ theme }) => theme.colors.greenDark};
  }
`;

const PlaceContainer = styled.section`
  section {
    &:last-child {
      div {
        display: none;
      }
    }
  }
`;

const PlaceList = styled.section`
  article {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  p {
    width: 16px;
    height: 16px;
    margin-right: 12px;
    background-color: ${({ theme }) => theme.colors.main900};
    color: ${({ theme }) => theme.colors.gray100};
    ${({ theme }) => theme.fonts.caption1};
    font-size: 0.8rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h2 {
    color: ${({ theme }) => theme.colors.gray900};
    ${({ theme }) => theme.fonts.body4};
  }

  div {
    border: 1px solid rgb(224, 224, 224);
    width: 0px;
    height: 12px;
    margin-left: 7.7px;
    position: relative;
  }
`;

const DetailTitle = styled.h1`
  margin-top: 1.6rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.gray900};
  ${({ theme }) => theme.fonts.heading2};
`;

const DetailContent = styled.p`
  color: ${({ theme }) => theme.colors.gray700};
  ${({ theme }) => theme.fonts.body2};
  margin-top: 16px;
`;

const MapLayout = styled.div`
  padding: 1.5rem 0;
`;
