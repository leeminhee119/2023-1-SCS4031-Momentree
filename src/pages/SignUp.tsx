import styled from 'styled-components';
import RegisterForm from '../components/register/RegisterForm';

const RegisterPage = () => {
  return (
    <PageContainer>
      <Title>회원가입</Title>
      <RegisterForm />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

export default RegisterPage;
