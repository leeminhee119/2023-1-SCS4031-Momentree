import styled from 'styled-components';

const Bar = styled.div`
  background-color: ${({ theme }) => theme.colors.border};
  height: 1px;
  width: 100%;
  margin-bottom: 2rem;
`;

export default Bar;
