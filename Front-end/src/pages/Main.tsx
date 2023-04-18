import styled from 'styled-components';
import Header from 'components/main/Header';

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
`;

const Main = () => {
  return (
    <MainContainer>
      <Header />
    </MainContainer>
  );
};

export default Main;
