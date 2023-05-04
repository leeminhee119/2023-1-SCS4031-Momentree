import styled from 'styled-components';
import closeIcon from '../../assets/icons/close.svg';
import { recordedPlacesState } from '\brecoil/atoms/recordedPlacesState';
import { IRecordedPlace } from 'types/post';
import { IImage } from 'types/post';
import { useRecoilState } from 'recoil';
import SaveButton from './SaveButton';
import { useState } from 'react';
interface PlaceModalProps {
  placeIdx: number;
  handleModalClose: () => void;
}
const PlaceModal = ({ placeIdx, handleModalClose }: PlaceModalProps) => {
  const [placesData, setPlacesData] = useRecoilState<IRecordedPlace[]>(recordedPlacesState);
  const [isSaveActive, setIsSaveActive] = useState<boolean>(false);
  const [placeContent, setPlaceContent] = useState<string>(placesData[placeIdx].placeContent);
  const [placeImages, setPlaceImages] = useState<IImage[]>(placesData[placeIdx].image);

  function handleChangeTextarea(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setPlaceContent(e.target.value);
    setIsSaveActive(true);
  }
  function handleClickSave() {
    setPlacesData((prevArr: IRecordedPlace[]) => {
      const newPlacesData = [...prevArr];
      newPlacesData[placeIdx] = {
        ...newPlacesData[placeIdx],
        placeContent: placeContent,
        image: placeImages,
      };
      return newPlacesData;
    });
    handleModalClose();
  }
  function handleUploadImg() {
    setPlaceImages([]);
    //TODO: S3업로더 생성, 업로드한 url을 저장
    //위 코드는 임시 코드
  }
  return (
    <ModalBackground>
      <ModalLayout>
        <TitleBox>
          {placesData[placeIdx].placeName}
          <div onClick={handleModalClose}>
            <CloseIcon src={closeIcon} alt="닫기 버튼" />
          </div>
        </TitleBox>
        <PlaceTextarea onChange={handleChangeTextarea} />
        <PlaceImgUploadInput type="file" onChange={handleUploadImg} />
        <SaveButton isActive={isSaveActive} handleClickSave={handleClickSave} />
      </ModalLayout>
    </ModalBackground>
  );
};

const CloseIcon = styled.img`
  width: 1.5rem;
`;
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;
const ModalLayout = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 90%;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 1.8rem;
  z-index: 1000;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const TitleBox = styled.div`
  ${({ theme }) => theme.fonts.suubtitle1};
  display: flex;
  justify-content: space-between;
`;

const PlaceTextarea = styled.textarea`
  border-radius: 1.8rem;
  border: 1px solid ${({ theme }) => theme.colors.gray400};
  width: 100%;
  height: 50%;
  margin: 1.5rem 0;
  padding: 1.5rem;
`;
const PlaceImgUploadInput = styled.input``;
export default PlaceModal;
