import styled from 'styled-components';
import { FormEvent, useState } from 'react';

const RegisterForm = () => {
  const [userName, setUserName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 회원가입 처리 로직
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input type="text" placeholder="성명" value={userName} onChange={(event) => setUserName(event.target.value)} />
      <Input type="text" placeholder="닉네임" value={nickname} onChange={(event) => setNickname(event.target.value)} />
      <Input type="email" placeholder="이메일" value={email} onChange={(event) => setEmail(event.target.value)} />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button type="submit">회원가입</Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 2rem;
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 300px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.mainDark};
  color: ${({ theme }) => theme.colors.gray100};
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`;

export default RegisterForm;
