import styled from 'styled-components';
import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import downIcon from '../../assets/icons/down.svg';

interface IDatePicker {
  dateDate: Date;
  setDateDate: (e: Date) => void;
}
const DatePicker = (props: IDatePicker) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e: Date) => {
    setIsOpen(!isOpen);
    props.setDateDate(e);
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  return (
    <>
      <DatePickerButton onClick={handleClick}>
        <div>{props.dateDate.toLocaleString().substring(0, 11)}</div>
        <img src={downIcon} />
      </DatePickerButton>
      {isOpen && <ReactDatePicker selected={props.dateDate} onChange={handleChange} inline />}
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
