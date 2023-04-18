import styled from 'styled-components';
import Header from 'components/main/Header';
import Search from 'components/main/Search';
import Margin from 'components/main/Margin';

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
`;

const Main = () => {
  return (
    <MainContainer>
      <Header />
      <Search />
      <Margin />
    </MainContainer>
  );
};

export default Main;
