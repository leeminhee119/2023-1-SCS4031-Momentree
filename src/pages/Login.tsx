/* eslint-disable @typescript-eslint/no-misused-promises */
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
// import { useRecoilState } from 'recoil';
import logoIcon from '../assets/logo.png';
import SaveButton from 'components/common/SaveButton';
import { userState } from '\brecoil/atoms/userState';
// import { useLogin } from 'hooks/queries/useLogin';
// import { loginState } from '\brecoil/atoms/loginState';

const Login = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [loginInput, setLoginInput] = useState({
    userName: '',
    password: '',
  }); // 사용자가 입력한 아이디 패스워드
  //   const [loginBody, setLoginBody] = useRecoilState(loginState);

  //   const setUserState = useSetRecoilState(userState);
  const tempUserState = useRecoilValue(userState);

  //   const data = useLogin(loginBody);
  //   console.log(data);
  //   useEffect(() => {
  //     setUserState(() => {
  //       return {
  //         userName: loginInput.userName,
  //         token: data.
  //       };
  //     });
  //   });
  useEffect(() => {
    if (loginInput.userName !== '' && loginInput.password !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [loginInput]);

  //   function handleLogin() {
  //     setLoginBody(loginInput);
  //   }

  async function handleLogin() {
    await fetch('http://3.39.153.141/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginInput),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        } else {
          console.log(response);
          //   setUserState(() => {
          //     return {
          //       userName: loginInput.userName,
          //       token: response.body.
          //     };
          //   });
        }
      })
      .catch((error) => console.log('error:', error));
  }

  console.log(tempUserState);
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
