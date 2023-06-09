import styled from 'styled-components';
import Header from 'components/main/Header';
// import Search from 'components/main/Search';
import Margin from 'components/main/Margin';
import Recommendation from 'components/main/Recommendation';
import Community from 'components/main/Community';

const Main = () => {
  return (
    <MainContainer>
      <Header />
      {/* <Search /> */}
      <Recommendation />
      <Margin />
      <Community />
    </MainContainer>
  );
};

export default Main;

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
`;
