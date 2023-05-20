import styled from 'styled-components';
import closeIcon from '../../assets/icons/close.svg';
import cameraIcon from '../../assets/icons/camera.svg';
import { recordedPlacesState } from '\brecoil/atoms/recordedPlacesState';
import { IImage, IRecordedPlace } from 'types/post';
import { useRecoilState } from 'recoil';
import SaveButton from '../common/SaveButton';
import { useEffect, useState } from 'react';
interface PlaceModalProps {
  placeIdx: number;
  handleModalClose: () => void;
}
const PlaceModal = ({ placeIdx, handleModalClose }: PlaceModalProps) => {
  const [placesData, setPlacesData] = useRecoilState<IRecordedPlace[]>(recordedPlacesState);
  const [isSaveActive, setIsSaveActive] = useState<boolean>(false);
  const [placeContent, setPlaceContent] = useState<string>(placesData[placeIdx].placeContent);
  // 각 장소의 세부 후기로 첨부한 이미지 파일들을 저장합니다.
  const [filesArray, setFilesArray] = useState<File[]>(() => {
    const files: File[] = [];
    placesData[placeIdx].images.forEach((imgObj: IImage) => {
      files.push(imgObj.imgFile);
    });
    return files;
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  //미리보기로 보여주기 위해 이미지 주소를 배열에 저장
  useEffect(() => {
    const previews: string[] = [];
    filesArray.forEach((file: File) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        previews.push(reader.result ? reader.result.toString() : '');
        setImagePreviews(() => [...previews]);
      };
    });
  }, []);

  function handleChangeTextarea(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setPlaceContent(e.target.value);
    setIsSaveActive(true);
  }
  function handleClickSave() {
    setPlacesData((prevArr: IRecordedPlace[]) => {
      const placeImages: IImage[] = [];
      filesArray.forEach((file: File, idx: number) => {
        placeImages.push({
          orders: idx + 1,
          imgFile: file,
        });
      });
      const newPlacesData = [...prevArr];
      newPlacesData[placeIdx] = {
        ...newPlacesData[placeIdx],
        placeContent: placeContent,
        images: placeImages,
      };
      return newPlacesData;
    });
    handleModalClose();
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
        <PlaceTextarea value={placeContent} onChange={handleChangeTextarea} />
        <input
          id="fileUpload"
          type="file"
          hidden
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
              const file = e.target.files[0];
              setFilesArray((files) => [...files, file]);
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onloadend = () => {
                setImagePreviews((prev) => [...prev, reader.result ? reader.result.toString() : '']);
              };
              if (placeContent !== '') {
                setIsSaveActive(true);
              }
            }
          }}
        />
        <UploadImageRow>
          {placesData[placeIdx].images && placesData[placeIdx].images.length <= 3 ? (
            <UploadButton as={'label'} htmlFor={'fileUpload'}>
              <CameraIcon src={cameraIcon} alt="카메라 아이콘" />
            </UploadButton>
          ) : null}
          <>
            {imagePreviews.map((preview, index) => {
              return <ImagePreview key={index} src={preview} alt="업로드 이미지 미리보기" />;
            })}
          </>
        </UploadImageRow>
        <SaveButton isActive={isSaveActive} handleClickSave={handleClickSave} />
      </ModalLayout>
    </ModalBackground>
  );
};

const CloseIcon = styled.img`
  width: 1.5rem;
`;
const CameraIcon = styled.img`
  width: 2rem;
  // svg파일 색상 변경 (gray400 #ADB5BD)
  filter: invert(80%) sepia(8%) saturate(311%) hue-rotate(169deg) brightness(93%) contrast(81%);
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
  ${({ theme }) => theme.fonts.subtitle1};
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
const UploadImageRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;
const UploadButton = styled.div`
  width: 10rem;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed ${({ theme }) => theme.colors.gray400};
  border-radius: 1rem;
`;

const ImagePreview = styled.img`
  width: 10rem;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  // border: 2px dashed ${({ theme }) => theme.colors.gray400};
  border-radius: 1rem;
`;
export default PlaceModal;
