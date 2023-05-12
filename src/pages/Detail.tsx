import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import clickbookmarkIcon from '../assets/icons/clickbookmark.svg';
import heartIcon from '../assets/icons/heart.svg';
import fillheartIcon from '../assets/icons/fillheart.svg';
import bookmarkIcon from '../assets/icons/bookmark.svg';
import leftIcon from '../assets/icons/left.svg';
import WriterInfo from 'components/detail/WriterInfo';
import { useCommunityDetailQuery } from 'hooks/queries/useCommunityDetail';
import { PlaceInformation, PlaceImageProps } from 'types/placeInformation';

import PlaceMapModal from '../components/detail/PlaceMapModal';

const Detail = () => {
  const { postId } = useParams();
  const [ishearted, setIshearted] = useState<boolean>(true);
  const [isbookmarked, setIsbookmarked] = useState<boolean>(false);
  const navigate = useNavigate();
  const { data } = useCommunityDetailQuery(Number(postId));

  const { kakao } = window;
  const [isOpenPlace, setIsOpenPlace] = useState<boolean>(false);
  const [clickedMarkerName, setClickedMarkerName] = useState<string>(''); // 지도에서 클릭한 마커의 장소명
  const [clickedMarkerContent, setClickedMarkerContent] = useState<string>(''); // 지도에서 클릭한 마커의 장소 내용
  const [clickedMarkerImage, setClickedMarkerImage] = useState<PlaceImageProps[]>([]); // 지도에서 클릭한 마커의 장소 이미지

  let sumX = 0;
  let sumY = 0;

  useEffect(() => {
    data?.result.recordedPlaces?.forEach((place: PlaceInformation) => {
      sumX += Number(place.addressX);
      sumY += Number(place.addressY);
    });

    const mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(
          sumY / data?.result.recordedPlaces.length,
          sumX / data?.result.recordedPlaces.length
        ), // 지도의 중심좌표
        level: 4, // 지도의 확대 레벨
      };

    const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 마커 이미지의 이미지 주소입니다
    const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

    data?.result.recordedPlaces.map((place: PlaceInformation) => {
      // 마커 이미지의 이미지 크기 입니다
      const imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(place.addressY, place.addressX), // 마커를 표시할 위치
        image: markerImage, // 마커 이미지
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        setIsOpenPlace(true);
        setClickedMarkerName(place.placeName); // 마커(장소) 이름
        setClickedMarkerContent(place.placeContent); // 마커(장소) 내용
        setClickedMarkerImage(place.placeImages); // 마커(장소) 사진
      });
    });
  }, [data]);

  return (
    <DetailContainer>
      <DetailHeader>
        <Icon
          src={leftIcon}
          alt="뒤로가기 아이콘"
          onClick={() => {
            navigate(-1);
          }}
        />
        <div>
          {ishearted ? (
            <Icon src={fillheartIcon} alt="좋아요 한 아이콘" onClick={() => setIshearted(false)} />
          ) : (
            <Icon src={heartIcon} alt="좋아요 하지 않은 아이콘" onClick={() => setIshearted(true)} />
          )}
          {isbookmarked ? (
            <Icon src={clickbookmarkIcon} alt="북마크 한 아이콘" onClick={() => setIsbookmarked(false)} />
          ) : (
            <Icon src={bookmarkIcon} alt="북마크 하지 않은 아이콘" onClick={() => setIsbookmarked(true)} />
          )}
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
        <p>게시글{data?.result.createdAt}</p> <br />
        <p>데이트{data?.result.dateDate}</p>
      </DetailInfo>
      <DetailTitle>{data?.result.title}</DetailTitle>
      <WriterInfo userName={data?.result.userName} />
      <MapLayout>
        <MapBox id="map" />
      </MapLayout>
      {isOpenPlace ? (
        <PlaceMapModal
          placeName={clickedMarkerName}
          placeContent={clickedMarkerContent}
          placeImage={clickedMarkerImage}
          handleModalClose={() => setIsOpenPlace(false)}
        />
      ) : null}
      <PlaceContainer>
        {data?.result.recordedPlaces.map((place: PlaceInformation, index: number) => {
          return (
            <PlaceList>
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
  justify-content: space-between;
  align-items: center;
  width: 100%;

  p {
    color: ${({ theme }) => theme.colors.gray400};
    ${({ theme }) => theme.fonts.caption2};
  }
`;

const TagContainer = styled.section`
  display: flex;
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
const MapBox = styled.div`
  width: 100%;
  height: 20rem;
  border-radius: 1.2rem;
`;
