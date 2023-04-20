import styled from 'styled-components';
import MenuIcon from '../assets/menu.svg'

const Header = () => {
    return (
        <HeaderBox>
            <h2>데이트버즈</h2>
            <img src={MenuIcon} />
        </HeaderBox>
    )
}
const HeaderBox = styled.div`
    h2 {
        font-size: 1.5em;
    }

    /* header/main */


    /* Auto layout */

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    // padding: 16px;
    gap: 247px;

    // position: absolute;
    // width: 375px;
    width: 100%;
    height: 60px;
    // left: 0px;
    // top: 47px;

    /* color-white */

    background: #FFFFFF;
`
export default Header;