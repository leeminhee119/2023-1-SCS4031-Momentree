import styled from 'styled-components';
import sidebarIcon from '../../assets/icons/sidebar.svg';

const Header = () => {
  return (
    <MainHeader>
      <h1>데이트 버즈</h1>
      <img src={sidebarIcon} alt="사이드바 열기 아이콘" />
    </MainHeader>
  );
};

export default Header;

const MainHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 6rem;
`;
