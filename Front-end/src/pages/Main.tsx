import styled from 'styled-components';
import Header from 'components/main/Header';
import Search from 'components/main/Search';
import Margin from 'components/main/Margin';
import Recommendation from 'components/main/Recommendation';

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
`;

const Main = () => {
  return (
    <MainContainer>
      <Header />
      <Search />
      <Recommendation />
      <Margin />
    </MainContainer>
  );
};

export default Main;
