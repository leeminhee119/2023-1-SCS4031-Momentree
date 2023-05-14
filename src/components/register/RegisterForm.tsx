/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logoIcon from '../../assets/logo.png';
import RegisterButton from './RegisterButton';

const Register = () => {
  // 회원가입 창의 상태와 활성화 여부를 관리하는 상태 변수들
  const [isActive, setIsActive] = useState<boolean>(false);
  const [registerInput, setRegisterInput] = useState({
    userName: '',
    email: '',
    password: '',
    nickName: '',
  });

  useEffect(() => {
    // 회원가입 입력 필드가 모두 채워졌을 때만 활성화 상태로 설정
    const { userName, email, password, nickName } = registerInput;
    if (userName !== '' && email !== '' && password !== '' && nickName !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [registerInput]);

  // 회원가입 양식 제출 시 호출되는 함수
  const handleRegister = () => {
    console.log(registerInput);
  };

  return (
    <RegisterLayout>
      {/* 로고 이미지 */}
      <LogoRow>
        <LogoImage src={logoIcon} alt="Logo" />
      </LogoRow>
      <RegisterForm onSubmit={handleRegister}>
        {/* 아이디 입력 필드 */}
        <Input
          type="text"
          name="username"
          placeholder="아이디를 입력해주세요"
          value={registerInput.userName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setRegisterInput((prev) => {
              return {
                ...prev,
                userName: event.target.value,
              };
            })
          }
        />
        <Input
          type="text"
          name="email"
          placeholder="이메일을 입력해주세요"
          value={registerInput.email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setRegisterInput((prev) => {
              return {
                ...prev,
                email: event.target.value,
              };
            })
          }
        />
        {/* 비밀번호 입력 필드 */}
        <Input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          value={registerInput.password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setRegisterInput((prev) => {
              return {
                ...prev,
                password: event.target.value,
              };
            })
          }
        />
        {/* 닉네임 입력 필드 */}
        <Input
          type="text"
          name="nickname"
          placeholder="닉네임을 입력해주세요"
          value={registerInput.nickName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setRegisterInput((prev) => {
              return {
                ...prev,
                nickName: event.target.value,
              };
            })
          }
        />
      </RegisterForm>
      {/* 회원가입 버튼 */}
      <RegisterButton label="회원가입" isActive={isActive} handleClickSave={handleRegister} />
      {/* 로그인 링크 */}
      <LoginLink>
        계정이 있으신가요? <StyledLink to="/login">로그인하기</StyledLink>
      </LoginLink>
    </RegisterLayout>
  );
};

const RegisterLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem; /* 위쪽 여백 조정 */
`;

const LogoRow = styled.div`
  margin-bottom: 5rem;
`;

const LogoImage = styled.img`
  width: 20rem;
`;

const RegisterForm = styled.form`
  // display: flex;
  // flex-direction: column;
  // align-items: center;
`;

const Input = styled.input`
  width: 100%;
  height: 3rem;
  margin-bottom: 2rem;
  padding: 1.5rem 1rem;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
  &:focus {
    border-color: ${({ theme }) => theme.colors.mainDark};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray400};
  }
`;

const LoginLink = styled.div`
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

export default Register;
