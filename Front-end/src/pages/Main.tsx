import styled from 'styled-components';
import Header from 'components/Header';

const MainPageContainer = styled.main`
    display: flex;
    flex-direction: column;

    h1{
        color:  ${({ theme }) => theme.colors.gray500};
        ${({ theme }) => theme.fonts.heading1};
    }
`;

const Main = () => {
    return (
        <MainPageContainer>
            <Header />
        </MainPageContainer>
    );
};

export default Main;
