import { deletedPlacesState, recordedPlacesState } from '\brecoil/atoms/recordedPlacesState';
import { useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import dragIcon from '../../assets/icons/drag.svg';
import closeIcon from '../../assets/icons/close.svg';
import { IRecordedPlace } from 'types/post';
import PlaceModal from './PlaceModal';

const PlaceItem = ({ isEdit }: { isEdit?: boolean }) => {
  const [places, setPlaces] = useRecoilState<IRecordedPlace[]>(recordedPlacesState);
  const [deletedPlaces, setDeletedPlaces] = useRecoilState<number[]>(deletedPlacesState);
  const [isOpenPlace, setIsOpenPlace] = useState<boolean>(false);
  const [clickedMarkerIdx, setClickedMarkerIdx] = useState<number>(0); // 클릭한 장소의 인덱스
  const draggingItemIdx = useRef<number>(-1);
  const draggingOverItemIdx = useRef<number>(-1);

  /* drag and drop 이벤트핸들러 */
  // 해당 아이템을 드래그할 때
  const onDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    draggingItemIdx.current = index;
  };
  // 다른 아이템이 해당 아이템 자리에 over될 때
  const onDragEnter = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    draggingOverItemIdx.current = index;
    const copyPlaces = [...places];
    const dragItemContent = copyPlaces[draggingItemIdx.current];
    copyPlaces.splice(draggingItemIdx.current, 1); // 드래그하고 있는 아이템 배열에서 삭제
    copyPlaces.splice(draggingOverItemIdx.current, 0, dragItemContent); // over된 자리에 드래그하고 있는 아이템 삽입
    draggingItemIdx.current = draggingOverItemIdx.current;
    draggingOverItemIdx.current = -1;
    setPlaces(copyPlaces);
  };
  // 드랍될 때
  const onDragEnd = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    draggingOverItemIdx.current = index;
    if (!isEdit) {
      const copyPlaces = places.map((place: IRecordedPlace, index: number) => {
        return { ...place, orders: index + 1 };
      });
      setPlaces(copyPlaces);
    } else {
      // 게시글 수정의 경우 - newOrders(새로 추가한 장소의 경우 orders)에 새로운 순서 저장
      const copyPlaces = places.map((place: IRecordedPlace, index: number) => {
        if (place.placeId) {
          return { ...place, newOrders: index + 1 };
        } else {
          return { ...place, orders: index + 1 };
        }
      });
      setPlaces(copyPlaces);
    }
  };

  const handleDeletePlace = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, index: number) => {
    const copyPlaces = [...places];
    const removed = copyPlaces.splice(index, 1);
    if (removed[0].placeId) {
      const copyDeletedPlaces = [...deletedPlaces, removed[0].placeId];
      setDeletedPlaces(copyDeletedPlaces);
    }

    setPlaces(
      copyPlaces.map((place: IRecordedPlace, index: number) => {
        if (place.placeId) {
          return { ...place, newOrders: index + 1 };
        } else {
          return { ...place, orders: index + 1 };
        }
      })
    );
  };
  return (
    <PlaceItemContainer>
      {places.map((place: IRecordedPlace, index: number) => {
        return (
          <PlaceItemBox
            key={index}
            onClick={() => {
              setClickedMarkerIdx(index);
              setIsOpenPlace(true);
            }}
            onDragStart={(e) => onDragStart(e, index)}
            onDragEnter={(e) => onDragEnter(e, index)}
            onDragEnd={(e) => onDragEnd(e, index)}
            onDragOver={(e) => e.preventDefault()}
            draggable>
            <DragIcon src={dragIcon} alt="드래그 버튼" />
            <PlaceItemInfo>
              <div id="name">{place.placeName}</div>
              <div id="address">{place.address}</div>
            </PlaceItemInfo>
            <CloseIcon
              src={closeIcon}
              alt="닫기 버튼"
              onClick={(e) => {
                e.stopPropagation(); // PlaceItemBox의 이벤트 핸들러 막기
                handleDeletePlace(e, index);
              }}
            />
          </PlaceItemBox>
        );
      })}
      {isOpenPlace && (
        <PlaceModal isEdit={isEdit} placeIdx={clickedMarkerIdx} handleModalClose={() => setIsOpenPlace(false)} />
      )}
    </PlaceItemContainer>
  );
};

export default PlaceItem;

const PlaceItemContainer = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
const PlaceItemBox = styled.div`
  display: flex;
  gap: 1.6rem;
  justify-content: space-between;
  width: 100%;
  height: 5.6rem;
  padding: 0.8rem 1.2rem;
  display: flex;
  background-color: ${({ theme }) => theme.colors.mainDark}16;
  border-radius: 1.2rem;
`;
const DragIcon = styled.img`
  width: 2rem;
`;
const CloseIcon = styled.img`
  width: 1.13rem;
  margin-right: 1rem;
`;
const PlaceItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 78%;
  div#name {
    ${({ theme }) => theme.fonts.body3};
    color: ${({ theme }) => theme.colors.gray900};
  }
  div#address {
    ${({ theme }) => theme.fonts.caption2};
    color: ${({ theme }) => theme.colors.gray500};
  }
`;
