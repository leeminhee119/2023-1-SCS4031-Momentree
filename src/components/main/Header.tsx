import styled from 'styled-components';
import sidebarIcon from '../../assets/icons/sidebar.svg';
import penIcon from '../../assets/icons/pen.svg';
import logoIcon from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <MainHeader>
      <LogoImage src={logoIcon} />
      <IconBox>
        <img src={penIcon} alt="글 작성하기 아이콘" onClick={() => navigate(`/selectTags`)} />
        <img src={sidebarIcon} alt="사이드바 열기 아이콘" />
      </IconBox>
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
const LogoImage = styled.img`
  width: 15rem;
`;
const IconBox = styled.div`
  display: flex;
  gap: 1rem;
`;
