import styled from 'styled-components';
import { useState } from 'react';
import unclickbookmarkIcon from '../../assets/icons/unclickbookmark.svg';
import clickbookmarkIcon from '../../assets/icons/clickbookmark.svg';
import heartIcon from '../../assets/icons/heart.svg';
import bookmarkIcon from '../../assets/icons/bookmark.svg';
import { CommunityItemProps } from '../../types/communityItem';

const CommunityItemContainer = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  margin-bottom: 2rem;

  p {
    color: ${({ theme }) => theme.colors.gray600};
    ${({ theme }) => theme.fonts.body4};
    margin-bottom: 0.6rem;
  }

  h1 {
    color: ${({ theme }) => theme.colors.gray900};
    ${({ theme }) => theme.fonts.body1};
    margin-bottom: 1.2rem;
  }
`;

const Map = styled.article`
  width: 100%;
  height: 16rem;

  background-color: ${({ theme }) => theme.colors.gray500};
  border-radius: 4px;
  margin-bottom: 1.2rem;
`;

const BookmarkIcon = styled.img`
  position: absolute;
  top: 0;
  left: 31.3rem;
  margin-right: 1.175rem;
  margin-top: 0.925rem;
  z-index: 1;
  color: rgb(79, 91, 102);
  cursor: pointer;
`;

const Icon = styled.img``;

const CommunityItemInfo = styled.article`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.6rem;
`;

const TagContainer = styled.article`
  display: flex;
  flex-direction: row;
  align-items: center;

  div {
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

const CommunityItem = ({ title, bookMarkStatus, likeCnt, bookmarkCnt }: CommunityItemProps) => {
  const [isbookmarked, setIsbookmarked] = useState<boolean>(bookMarkStatus);

  return (
    <CommunityItemContainer>
      <Map></Map>
      {isbookmarked ? (
        <BookmarkIcon src={clickbookmarkIcon} alt="북마크 한 아이콘" onClick={() => setIsbookmarked(false)} />
      ) : (
        <BookmarkIcon src={unclickbookmarkIcon} alt="북마크 하지 않은 아이콘" onClick={() => setIsbookmarked(true)} />
      )}
      <h1>{title}</h1>
      <p>중구, 강남구, </p>
      <CommunityItemInfo>
        <TagContainer>
          <div>편안함</div>
          <div>안락함</div>
          <div>신나는</div>
          <div>안락함</div>
        </TagContainer>
        <IconContainer>
          <Icon src={heartIcon} alt="좋아요 아이콘" onClick={() => setIsbookmarked(true)} /> <p>{likeCnt}</p>
          <Icon src={bookmarkIcon} alt="북마크 아이콘" onClick={() => setIsbookmarked(true)} /> <p>{bookmarkCnt}</p>
        </IconContainer>
      </CommunityItemInfo>
    </CommunityItemContainer>
  );
};

export default CommunityItem;
