import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import closeIcon from '../assets/icons/close.svg';
import { useCookies } from 'react-cookie';

interface NavProps {
  setIsNavOpen(state: boolean): void;
}

const Nav = ({ setIsNavOpen }: NavProps) => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(['user']);

  const USERPAGE_LIST = [
    { title: '나의 데이트 코스', url: 'userPage/myPostList' },
    { title: '나의 북마크', url: 'userPage/myBookmarkList' },
    { title: '팔로잉 유저', url: 'userPage/myPostList' },
  ];

  // 로그아웃 처리 함수
  const handleLogout = () => {
    console.log('쿠키를 삭제합니다.');
    removeCookie('user', { path: '/' });
    navigate('/'); // 필요하다면 홈 페이지로 리다이렉트합니다.
  };

  return (
    <NavBackground>
      <NavContainer>
        <IconImage>
          <img src={closeIcon} alt="닫기 아이콘" onClick={() => setIsNavOpen(false)} />
        </IconImage>
        {cookies.user.userToken ? (
          <>
            <UserInfo>
              <UserImage
                src="https://user-images.githubusercontent.com/62867581/234172890-03b605e4-9e8d-4661-8142-cb94bae8e3a4.png"
                alt="유저 이미지"
              />
              <UserName>{cookies.user.userName}</UserName>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            </UserInfo>
            <UserFollower>
              <article>
                <h1>팔로워</h1>
                <p>1125</p>
              </article>
              <article>
                <h1>팔로잉</h1>
                <p>58</p>
              </article>
            </UserFollower>
            <List onClick={() => navigate(`/selectTags`)}>코스 등록하기</List>
            <Bar></Bar>
            {USERPAGE_LIST.map((item, index) => {
              return (
                <List key={index} onClick={() => navigate(`${item.url}`)}>
                  {item.title}
                </List>
              );
            })}
          </>
        ) : (
          <GotoLoginButton type="button" onClick={() => navigate('/login')}>
            로그인하기
          </GotoLoginButton>
        )}
      </NavContainer>
    </NavBackground>
  );
};

export default Nav;

const NavBackground = styled.main`
  background-color: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: 100vh;
  z-index: 10;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  margin-left: -1.6rem;
  top: 0;
`;

const NavContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 271px;
  background-color: ${({ theme }) => theme.colors.gray100};
  ${({ theme }) => theme.fonts.body1};
  padding: 47px 1.6rem 3.2rem;
`;

const UserInfo = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 12px;
`;

const UserImage = styled.img`
  width: 32px;
  height: 32px;
  border-raidous: 50%;
  margin-right: 10px;
`;

const UserName = styled.h1``;

const LogoutButton = styled.p`
  color: ${({ theme }) => theme.colors.gray400};
  ${({ theme }) => theme.fonts.caption3};
  display: flex;
  margin: 0.7rem;
  justify-content: flex-end;
  width: 100%;
`;

const UserFollower = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 8px 44px;
  width: 239px;
  height: 55px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray200};
  ${({ theme }) => theme.fonts.body1};

  margin-bottom: 30px;
  article {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  div {
    color: ${({ theme }) => theme.colors.border};
    height: 1px;
  }
  h1 {
    color: ${({ theme }) => theme.colors.gray500};
    ${({ theme }) => theme.fonts.caption2};
  }

  p {
    color: ${({ theme }) => theme.colors.gray900};
    ${({ theme }) => theme.fonts.body3};
  }
`;

const IconImage = styled.section`
  height: 6rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  img {
    width: 2rem;
  }
`;

const Bar = styled.div`
  color: ${({ theme }) => theme.colors.border};
  height: 1px;
`;

const List = styled.p`
  color: ${({ theme }) => theme.colors.gray900};
  ${({ theme }) => theme.fonts.body3};
  margin-bottom: 20px;
`;

const GotoLoginButton = styled.button`
  color: ${({ theme }) => theme.colors.gray900};
  background-color: ${({ theme }) => theme.colors.mainLight};
  ${({ theme }) => theme.fonts.body3};
  border-radius: 30px;
  height: 3rem;
`;
