/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logoIcon from '../assets/logo.png';
import RegisterButton from 'components/register/RegisterButton';
import { POST } from '../apis/api';
import { useMutation } from '@tanstack/react-query';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ModifyUserInfo = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [modifyInput, setModifyInput] = useState({
    password: '',
    nickname: '',
  });
  const handleModify = useModifyUserMutation(modifyInput); // 사용자 정보를 수정하는 Mutation

  useEffect(() => {
    const { password, nickname } = modifyInput;
    if (password !== '' && nickname !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [modifyInput]);

  return (
    <ModifyLayout>
      <LogoRow>
        <LogoImage src={logoIcon} alt="Logo" />
      </LogoRow>
      <ModifyForm>
        <Input
          type="password"
          name="password"
          placeholder="새로운 비밀번호를 입력해주세요"
          value={modifyInput.password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setModifyInput((prev) => {
              return {
                ...prev,
                password: event.target.value,
              };
            })
          }
        />
        <Input
          type="text"
          name="nickname"
          placeholder="새로운 닉네임을 입력해주세요"
          value={modifyInput.nickname}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setModifyInput((prev) => {
              return {
                ...prev,
                nickname: event.target.value,
              };
            })
          }
        />
      </ModifyForm>
      <RegisterButton label="수정완료" isActive={isActive} handleClickSave={() => handleModify.mutate()} />
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

// useModifyUserMutation은 아래와 같습니다.
interface IBody {
  password: string;
  nickname: string;
}

export const useModifyUserMutation = (body: IBody) => {
  const navigator = useNavigate();
  return useMutation(() => postModifyUserInfo(body), {
    onSuccess: () => {
      navigator('/'); // 수정 후 프로필 페이지로 이동
    },
  });
};

// postModifyUserInfo 함수는 변경된 사용자 정보를 보내는 API를 호출
export const postModifyUserInfo = async (body: IBody) => {
  const { data } = await POST('/modifyUserInfo', body); // '/modifyUserInfo'는 사용자 정보 수정 API 엔드포인트
  return data;
};
