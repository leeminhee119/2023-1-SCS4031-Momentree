import styled from 'styled-components';
import closeIcon from '../../assets/icons/close.svg';
import { PlaceImageProps } from 'types/placeInformation';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface PlaceMapModalProps {
  placeName: string;
  placeContent: string;
  placeImage: PlaceImageProps[];
  handleModalClose: () => void;
}

const PlaceMapModal = ({ placeName, placeContent, placeImage, handleModalClose }: PlaceMapModalProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
  };

  return (
    <ModalBackground>
      <ModalLayout>
        <TitleBox>
          {placeName}
          <div onClick={handleModalClose}>
            <CloseIcon src={closeIcon} alt="닫기 버튼" />
          </div>
        </TitleBox>

        <PlaceContent>{placeContent}</PlaceContent>
        <ImgSlider {...settings}>
          {placeImage?.map((img, index) => {
            return <PlaceImage src={img.imageUrl} key={index} alt="장소 이미지" />;
          })}
        </ImgSlider>
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
  ${({ theme }) => theme.fonts.subtitle1};
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const PlaceContent = styled.p`
  border-radius: 1.8rem;
  border: 1px solid ${({ theme }) => theme.colors.gray400};
  ${({ theme }) => theme.fonts.body1};
  width: 100%;
  height: 50%;
  margin: 1.5rem 0;
  padding: 1.5rem;
`;

const ImgSlider = styled(Slider)`
  .slick-dots {
    bottom: 20px;
  }
`;

const PlaceImage = styled.img`
  position: relative;
  height: 41rem;
  border-radius: 1.8rem;
  object-fit: cover;
`;
export default PlaceMapModal;
