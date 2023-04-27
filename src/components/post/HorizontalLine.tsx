import styled from 'styled-components';

const HorizontalLine = () => {
  return <Line />;
};

const Line = styled.div`
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.colors.gray300};
  margin: 0 -1.6rem;
`;

export default HorizontalLine;
