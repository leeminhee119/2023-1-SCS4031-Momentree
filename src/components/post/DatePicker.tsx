import styled from 'styled-components';
import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import downIcon from '../../assets/icons/down.svg';
import { IRecord } from 'types/post';
import { IEditMainPost } from 'types/editPost';
import { useSetRecoilState } from 'recoil';
import { recordState } from '\brecoil/atoms/recordState';
import moment from 'moment';

interface IDatePicker {
  dateDate: string;
  newDate?: string;
  setNewDate?: React.Dispatch<React.SetStateAction<IEditMainPost>>;
}
const DatePicker = ({ dateDate, newDate, setNewDate }: IDatePicker) => {
  const [isOpen, setIsOpen] = useState(false);
  const setRecordData = useSetRecoilState(recordState);
  const handleChange = (e: Date) => {
    setIsOpen(!isOpen);

    if (setNewDate) {
      // 글 수정의 경우
      setNewDate((prevState: IEditMainPost) => ({ ...prevState, dateDate: e.toLocaleDateString() }));
    } else {
      // 새 글 작성의 경우 (전역 상태 변경)
      setRecordData((prevState: IRecord) => ({
        ...prevState,
        dateDate: e.toLocaleDateString(),
      }));
    }
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  return (
    <>
      <DatePickerButton onClick={handleClick}>
        <div>{newDate ? newDate : dateDate}</div>
        <img src={downIcon} />
      </DatePickerButton>
      {isOpen && <ReactDatePicker selected={moment(dateDate, 'YYYY-MM-DD').toDate()} onChange={handleChange} inline />}
    </>
  );
};

const DatePickerButton = styled.button`
  height: 5rem;
  width: 100%; // 텍스트 바깥 영역을 선택해도 캘린더 펼쳐지도록
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  color: ${({ theme }) => theme.colors.gray900};
  ${({ theme }) => theme.fonts.body1};
  img {
    width: 1.6rem;
  }
`;
export default DatePicker;
