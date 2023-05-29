import styled from 'styled-components';
import unclickbookmarkIcon from '../../assets/icons/unclickbookmark.svg';
import clickbookmarkIcon from '../../assets/icons/clickbookmark.svg';
import heartIcon from '../../assets/icons/heart.svg';
import bookmarkIcon from '../../assets/icons/bookmark.svg';
import { PostItemProps } from '../../types/postItem';
import MapThumbnail from 'components/common/MapThumbnail';
import { useNavigate } from 'react-router-dom';

const PostMainItem = ({
  recordedId,
  title,
  bookMarkStatus,
  likeCnt,
  bookmarkCnt,
  place,
  vibeTag,
  activityTag,
}: PostItemProps) => {
  const navigate = useNavigate();

  const handleTagClick = (tag: string) => {
    navigate(`/search/${tag}`);
  };

  return (
    <PostItemContainer>
      <MapContainer>
        <MapThumbnail recordedId={recordedId} places={place} />
      </MapContainer>
      {bookMarkStatus ? (
        <BookmarkIcon src={clickbookmarkIcon} alt="북마크 한 아이콘" />
      ) : (
        <BookmarkIcon src={unclickbookmarkIcon} alt="북마크 하지 않은 아이콘" />
      )}
      <h1
        onClick={() => {
          navigate(`/post/${recordedId}`);
          window.location.reload();
        }}>
        {title}
      </h1>
      <PostItemInfo>
        <div>
          <MoodTagContainer>
            {vibeTag?.map((item, index) => {
              return (
                <article key={index} onClick={() => handleTagClick(item.tagName)}>
                  {item.tagName}
                </article>
              );
            })}
          </MoodTagContainer>
          <ActivityTagContainer>
            {activityTag?.map((item, index) => {
              return (
                <article key={index} onClick={() => handleTagClick(item.tagName)}>
                  {item.tagName}
                </article>
              );
            })}
          </ActivityTagContainer>
        </div>
        <IconContainer>
          <Icon src={heartIcon} alt="좋아요 아이콘" /> <p>{likeCnt}</p>
          <Icon src={bookmarkIcon} alt="북마크 아이콘" /> <p>{bookmarkCnt}</p>
        </IconContainer>
      </PostItemInfo>
    </PostItemContainer>
  );
};

export default PostMainItem;

const PostItemContainer = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  margin-bottom: 2rem;
  cursor: pointer;

  h1 {
    color: ${({ theme }) => theme.colors.gray900};
    ${({ theme }) => theme.fonts.body1};
    margin-bottom: 1.2rem;
  }
`;

const MapContainer = styled.article`
  width: 100%;
  height: 16rem;

  border-radius: 4px;
  margin-bottom: 1.2rem;
`;

const BookmarkIcon = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 1.175rem;
  margin-top: 0.925rem;
  z-index: 1;
  color: rgb(79, 91, 102);
  cursor: pointer;
`;

const Icon = styled.img``;

const PostItemInfo = styled.article`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.6rem;
`;

const MoodTagContainer = styled.article`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.6rem;

  article {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5.5rem;
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

const IconContainer = styled.article`
  display: flex;
  flex-direction: row;
  align-items: center;

  p {
    color: ${({ theme }) => theme.colors.gray900};
    ${({ theme }) => theme.fonts.caption2};
    margin-right: 1.225rem;
    margin-bottom: 0;
  }

  img {
    margin-right: 0.4rem;
  }
`;
