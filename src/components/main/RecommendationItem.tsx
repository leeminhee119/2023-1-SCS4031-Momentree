import styled from 'styled-components';
import unclickbookmarkIcon from '../../assets/icons/unclickbookmark.svg';
import clickbookmarkIcon from '../../assets/icons/clickbookmark.svg';
import heartIcon from '../../assets/icons/heart.svg';
import bookmarkIcon from '../../assets/icons/bookmark.svg';
import { RecommendationItemProps } from '../../types/recommendationItem';
import RecommendMapThumbnail from 'components/common/RecommendMapThumnail';
import { useEffect, useState } from 'react';

const RecommendationItemContainer = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 24rem;
  height: 24rem;
  margin-right: 0.8rem;
  cursor: pointer;

  h1 {
    color: ${({ theme }) => theme.colors.gray700};
    ${({ theme }) => theme.fonts.body3};
    margin-bottom: 0.6rem;
  }
`;

const Map = styled.article`
  width: 24rem;
  height: 13rem;
  background-color: ${({ theme }) => theme.colors.gray500};
  border-radius: 4px;
  margin-bottom: 1.2rem;
`;

const BookmarkIcon = styled.img`
  position: absolute;
  top: 0;
  left: 21.4rem;
  margin-right: 1.175rem;
  margin-top: 0.925rem;
  z-index: 1;
  color: rgb(79, 91, 102);
  cursor: pointer;
`;

const Icon = styled.img``;

const PlaceContainer = styled.article`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.5rem;

  article {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.mainDark};
    ${({ theme }) => theme.fonts.caption2};
    margin-right: 0.6rem;
  }
`;

const RecommendationItemInfo = styled.article`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2rem;

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

const RecommendationItem = ({
  recordedId,
  title,
  bookMarkStatus,
  likeCnt,
  bookmarkCnt,
  place,
}: RecommendationItemProps) => {
  const [addressGuArray, setAddressGuArray] = useState<string[]>([]);

  useEffect(() => {
    const uniqueAddressGu = Array.from(new Set(place?.map((item) => item.addressGu)));
    setAddressGuArray(uniqueAddressGu);
  }, [place]);

  return (
    <RecommendationItemContainer>
      <Map>
        <RecommendMapThumbnail recordedId={recordedId} places={place} />
      </Map>
      {bookMarkStatus ? (
        <BookmarkIcon src={clickbookmarkIcon} alt="북마크 한 아이콘" />
      ) : (
        <BookmarkIcon src={unclickbookmarkIcon} alt="북마크 하지 않은 아이콘" />
      )}
      <h1>{title}</h1>
      <PlaceContainer>
        {addressGuArray.map((addressGu, index) => {
          return <article key={index}>{addressGu}</article>;
        })}
      </PlaceContainer>
      <RecommendationItemInfo>
        <Icon src={heartIcon} alt="좋아요 아이콘" /> <p>{likeCnt}</p>
        <Icon src={bookmarkIcon} alt="북마크 아이콘" /> <p>{bookmarkCnt}</p>
      </RecommendationItemInfo>
    </RecommendationItemContainer>
  );
};

export default RecommendationItem;
