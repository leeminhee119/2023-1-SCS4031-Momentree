/* eslint-disable @typescript-eslint/no-misused-promises */
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import logoIcon from '../assets/logo.png';
import SaveButton from 'components/common/SaveButton';

const Login = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [loginInput, setLoginInput] = useState({
    userName: '',
    password: '',
  });

  useEffect(() => {
    if (loginInput.userName !== '' && loginInput.password !== '') {
      setIsActive(true);
    }
  }, [loginInput]);

  function handleLogin() {
    console.log(loginInput);
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
        />
      </LoginRow>
      <SaveButton label="로그인" isActive={isActive} handleClickSave={handleLogin} />
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

export default Login;
