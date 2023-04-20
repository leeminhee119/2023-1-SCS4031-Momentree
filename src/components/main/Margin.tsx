import styled from 'styled-components';

const Margin = () => {
  return <MarginContainer></MarginContainer>;
};

export default Margin;

const MarginContainer = styled.section`
  height: 10px;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.gray200};
  margin: 0 -16px;
`;
