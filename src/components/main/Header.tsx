import styled from 'styled-components';
import sidebarIcon from '../../assets/icons/sidebar.svg';
import logoIcon from '../../assets/logo.png';

import Nav from 'pages/Nav';
import { useState } from 'react';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  return (
    <MainHeader>
      <LogoImage src={logoIcon} />
      <IconBox>
        <img
          src={sidebarIcon}
          alt="네브바 열기 아이콘"
          onClick={() => {
            setIsNavOpen(true);
          }}
        />
      </IconBox>
      {isNavOpen && <Nav setIsNavOpen={setIsNavOpen} />}
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
  width: 10rem;
`;
const IconBox = styled.div`
  display: flex;
  gap: 1rem;
`;
