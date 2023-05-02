import styled from 'styled-components';
import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import downIcon from '../../assets/icons/down.svg';
import { IRecord } from 'types/post';

interface IDatePicker {
  dateDate: string;
  setRecordData: React.Dispatch<React.SetStateAction<IRecord>>;
}
const DatePicker = (props: IDatePicker) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e: Date) => {
    setIsOpen(!isOpen);
    props.setRecordData((prevState: IRecord) => {
      return {
        ...prevState,
        dateDate: e.toLocaleString(),
      };
    });
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  return (
    <>
      <DatePickerButton onClick={handleClick}>
        <div>{props.dateDate.substring(0, 11)}</div>
        <img src={downIcon} />
      </DatePickerButton>
      {isOpen && <ReactDatePicker selected={new Date(props.dateDate)} onChange={handleChange} inline />}
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
