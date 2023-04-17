import styled from 'styled-components';

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
          <h1>데이트 버즈</h1>
        </MainPageContainer>
    );
};

export default Main;
