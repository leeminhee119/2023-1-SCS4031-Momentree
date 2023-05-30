import styled from 'styled-components';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import dragIcon from '../../assets/icons/drag.svg';
import closeIcon from '../../assets/icons/close.svg';
import { IRecordedPlace } from 'types/post';
import PlaceModal from './PlaceModal';
import { deletedPlacesState, recordedPlacesState } from '\brecoil/atoms/recordedPlacesState';

const PlaceItem = ({ isEdit }: { isEdit?: boolean }) => {
  const [places, setPlaces] = useRecoilState<IRecordedPlace[]>(recordedPlacesState);
  const [deletedPlaces, setDeletedPlaces] = useRecoilState<number[]>(deletedPlacesState);
  const [isOpenPlace, setIsOpenPlace] = useState<boolean>(false);
  const [clickedMarkerIdx, setClickedMarkerIdx] = useState<number>(0); // 클릭한 장소의 인덱스

  // 드랍될 때
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) {
      return;
    }
    const copyPlaces = [...places];
    const [removed] = copyPlaces.splice(source.index, 1);
    copyPlaces.splice(destination.index, 0, removed);

    /* 전역 places 상태의 각 장소들을 새로운 orders 값으로 업데이트 */
    if (!isEdit) {
      setPlaces(
        copyPlaces.map((place: IRecordedPlace, index: number) => {
          return { ...place, orders: index + 1 };
        })
      );
    } else {
      // 게시글 수정의 경우 - newOrders(새로 추가한 장소의 경우 orders)에 새로운 순서 저장
      setPlaces(
        places.map((place: IRecordedPlace, index: number) => {
          if (place.placeId) {
            return { ...place, newOrders: index + 1 };
          } else {
            return { ...place, orders: index + 1 };
          }
        })
      );
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
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <PlaceItemContainer {...provided.droppableProps} ref={provided.innerRef}>
              {places.map((place: IRecordedPlace, index: number) => {
                return (
                  <Draggable key={index} draggableId={`item-${index}`} index={index}>
                    {(provided, snapshot) => (
                      <PlaceItemBox
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        isDraggingOver={snapshot.isDragging}
                        onClick={() => {
                          setClickedMarkerIdx(index);
                          setIsOpenPlace(true);
                        }}>
                        <DragIcon src={dragIcon} alt="드래그 버튼" />
                        <PlaceItemInfo>
                          <div id="name">{place.placeName}</div>
                          <div id="address">{place.address}</div>
                        </PlaceItemInfo>
                        <CloseIcon
                          src={closeIcon}
                          alt="닫기 버튼"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePlace(e, index);
                          }}
                        />
                      </PlaceItemBox>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </PlaceItemContainer>
          )}
        </Droppable>
      </DragDropContext>
      {isOpenPlace && (
        <PlaceModal isEdit={isEdit} placeIdx={clickedMarkerIdx} handleModalClose={() => setIsOpenPlace(false)} />
      )}
    </>
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
const PlaceItemBox = styled.div<{ isDraggingOver: boolean }>`
  display: flex;
  gap: 1.6rem;
  justify-content: space-between;
  width: 100%;
  height: 5.6rem;
  padding: 0.8rem 1.2rem;
  display: flex;
  background-color: ${({ theme, isDraggingOver }) =>
    isDraggingOver ? theme.colors.mainDark : theme.colors.mainLight}30;
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
