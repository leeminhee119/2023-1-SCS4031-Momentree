/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import logoIcon from '../assets/logo.png';
import RegisterButton from 'components/register/RegisterButton';
import { PATCH } from '../apis/api';
import { useMutation } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { useUserInfoQuery } from 'hooks/queries/useUser';
import defaultProfileIcon from '../assets/icons/profile_white.svg';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ModifyUserInfo = () => {
  const [cookies] = useCookies(['user']);
  const { data } = useUserInfoQuery(cookies?.user?.userToken);
  const token = cookies?.user?.userToken;

  const [isActive, setIsActive] = useState<boolean>(false);
  const [modifyInput, setModifyInput] = useState<{ nickname: string; image: File | null }>({
    nickname: data?.result?.nickname || '',
    image: null,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  // 이미지 파일을 선택했을 때의 이벤트 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleModify = useModifyUserMutation(modifyInput, token, selectedImage, setSelectedImage);

  // 이 useEffect는 data가 변경될 때마다 실행됩니다. 따라서 data가 로드되면 modifyInput의 nickname을 업데이트합니다.
  useEffect(() => {
    setModifyInput((prev) => ({
      ...prev,
      nickname: data?.result?.nickname || '',
    }));
  }, [data]);

  // 이미지 파일 선택 후, 현재 선택된 이미지를 modifyInput에 설정
  useEffect(() => {
    setModifyInput((prev) => ({ ...prev, image: selectedImage }));
  }, [selectedImage]);

  useEffect(() => {
    const { nickname } = modifyInput;
    if (nickname !== '') {
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
        <UserImage
          src={
            selectedImage
              ? URL.createObjectURL(selectedImage)
              : data?.result.profileImg
              ? data?.result.profileImg
              : defaultProfileIcon
          }
          alt="유저 이미지"
          onClick={() => document.getElementById('upload')?.click()}
        />
        <Input
          id="upload"
          type="file"
          style={{ display: 'none' }} // 파일 업로드 창을 숨김
          onChange={handleImageChange} // 파일 선택 시 이벤트 핸들러
        />
        <Input
          type="text"
          name="nickname"
          placeholder="변경할 닉네임을 입력해주세요"
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
      <ModifyPassword>
        비밀번호를 변경하고 싶으신가요? <StyledLink to="/modifyPassword">비밀번호 변경</StyledLink>
      </ModifyPassword>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const ModifyPassword = styled.div`
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

const UserImage = styled.img`
  width: 16.4rem;
  height: 16.4rem;
  border-radius: 50%;
  margin: auto;
`;

interface IBody {
  nickname: string;
}
// useModifyUserMutation은 아래와 같습니다.
// patchModifyUserInfo 함수는 변경된 사용자 정보를 보내는 API를 호출
export const patchModifyUserInfo = async (body: IBody, token: string, selectedImage: File | null) => {
  const formData = new FormData(); // FormData 생성
  formData.append('nickname', body.nickname); // 닉네임 추가
  if (selectedImage) {
    formData.append('image', selectedImage); // 이미지 추가
  }
  const { data } = await PATCH('/modifyUserInfo/data', formData, token); // FormData를 사용하여 PATCH 요청
  return data;
};

export const useModifyUserMutation = (
  body: IBody,
  token: string,
  selectedImage: File | null,
  setSelectedImage: (image: File | null) => void
) => {
  const navigator = useNavigate();
  return useMutation(() => patchModifyUserInfo(body, token, selectedImage), {
    onSuccess: () => {
      setSelectedImage(null); // onSuccess에서 setSelectedImage 함수 사용
      navigator('/');
    },
  });
};

export default ModifyUserInfo;
