import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logoIcon from '../assets/logo.png';
import RegisterButton from 'components/register/RegisterButton';
import { PATCH } from '../apis/api';
import { useMutation } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';

const ModifyPassword = () => {
  const [cookies] = useCookies(['user']);
  const token = cookies?.user?.userToken;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
    setPasswordError(event.target.value !== newPassword);
  };

  const handleModify = useModifyUserMutation({ password: newPassword }, token); // 사용자 정보를 수정하는 Mutation

  useEffect(() => {
    setIsActive(newPassword === confirmPassword && newPassword !== '');
  }, [newPassword, confirmPassword]);

  return (
    <ModifyLayout>
      <LogoRow>
        <LogoImage src={logoIcon} alt="Logo" />
      </LogoRow>
      <ModifyForm
        onSubmit={(event) => {
          event.preventDefault();
        }}>
        <Input
          type="password"
          name="newPassword"
          placeholder="새 비밀번호를 입력하세요"
          value={newPassword}
          onChange={handlePasswordChange}
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호를 다시 입력하세요"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {passwordError && <ErrorText>입력하신 비밀번호가 일치하지 않습니다.</ErrorText>}
        <RegisterButton label="수정완료" isActive={isActive} handleClickSave={() => handleModify.mutate()} />
      </ModifyForm>
    </ModifyLayout>
  );
};

const ModifyLayout = styled.div`
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

const ModifyForm = styled.form`
  width: 100%;
  flex-direction: column;
  align-items: center;
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

const ErrorText = styled.p`
  color: red;
`;

interface IBody {
  password: string;
}

export const useModifyUserMutation = (body: IBody, token: string) => {
  const navigate = useNavigate();
  return useMutation(() => patchModifyUserInfo(body, token), {
    onSuccess: () => {
      navigate('/'); // 수정 후 프로필 페이지로 이동
    },
  });
};

export const patchModifyUserInfo = async (body: IBody, token: string) => {
  const { data } = await PATCH('/modifyPassword/data', body, token); // Changed from POST to PATCH
  return data;
};
export default ModifyPassword;
