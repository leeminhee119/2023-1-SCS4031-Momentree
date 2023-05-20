import styled from 'styled-components';
import Header from 'components/main/Header';
import Search from 'components/main/Search';
import Margin from 'components/main/Margin';
import Recommendation from 'components/main/Recommendation';
import Community from 'components/main/Community';
import { useCookies } from 'react-cookie';
import { useCommunityQuery, useLoginCommunityQuery } from '../hooks/queries/useCommunity';

const Main = () => {
  const [cookies] = useCookies(['user']);

  const { data } = useLoginCommunityQuery(cookies.user.userToken);

  // if (token) {
  //   data = useLoginCommunityQuery(token);
  // }

  return (
    <MainContainer>
      <Header />
      <Search />
      <Recommendation />
      <Margin />
      <Community communityData={data?.result?.content} />
    </MainContainer>
  );
};

export default Main;

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
`;
