/* eslint-disable @typescript-eslint/no-misused-promises */
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoIcon from '../assets/logo.png';
import SaveButton from 'components/common/SaveButton';
import { useLoginMutation } from 'hooks/queries/useLogin';

const Login = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [loginInput, setLoginInput] = useState({
    userName: '',
    password: '',
  }); // 사용자가 입력한 아이디 패스워드

  //TODO: 로그인 실패 시 상태코드 다르게 가져오면 setIsRedirect 파라미터 제거 (성공 시 직접 리다이렉트)
  const [isRedirect, setIsRedirect] = useState<boolean>(false);
  // API에 post 요청 보내기 위한 useMutation 훅 가져오기
  const loginMutation = useLoginMutation(loginInput.userName, loginInput.password, setIsRedirect); // 입력한 userName, password 전달

  useEffect(() => {
    if (loginInput.userName !== '' && loginInput.password !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
    if (isRedirect) navigate('/');
  }, [loginInput, isRedirect]);

  function handleLogin() {
    // API post 요청
    loginMutation.mutate();

    //TODO: 로그인 실패 시 loginMutation.isSuccess -> 리다이렉트
  }

  return (
    <LoginLayout>
      <LogoRol>
        <img src={logoIcon} />
      </LogoRol>
      <LoginRow>
        <LoginInput
          placeholder="아이디"
          type="text"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setLoginInput((prev) => {
              return {
                ...prev,
                userName: event.target.value,
              };
            })
          }
        />
        <LoginInput
          placeholder="비밀번호"
          type="password"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setLoginInput((prev) => {
              return {
                ...prev,
                password: event.target.value,
              };
            })
          }
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key == 'Enter' && loginInput.userName && loginInput.password) {
              handleLogin();
            }
          }}
        />
      </LoginRow>
      <SaveButton label="로그인" isActive={isActive} handleClickSave={handleLogin} />
      <LoginLink>
        아직 계정이 없으신가요? <StyledLink to="/signup">회원가입하기</StyledLink>
      </LoginLink>
    </LoginLayout>
  );
};

const LoginLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;
`;
const LogoRol = styled.div`
  img {
    width: 20rem;
  }
  margin-bottom: 5rem;
`;
const LoginRow = styled.div`
  margin-bottom: 5rem;
  width: 100%;
`;
const LoginInput = styled.input`
  width: 100%;
  height: 3rem;
  margin-bottom: 1rem;
  padding: 1.5rem 1rem;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
  &:focus {
    border-color: ${({ theme }) => theme.colors.mainDark};
  }
`;

const LoginLink = styled.p`
  margin-top: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray400};
  font: ${({ theme }) => theme.fonts.caption2};
`;

const StyledLink = styled(Link)`
  && {
    color: ${({ theme }) => theme.colors.gray500};
    font: ${({ theme }) => theme.fonts.caption1};
    text-decoration: none;
  }
`;

export default Login;
