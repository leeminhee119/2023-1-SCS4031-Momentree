import React from 'react';
import styled from 'styled-components';
import RegisterForm from '../components/register/RegisterForm';

const SignUp = () => {
  return (
    <PageLayout>
      <RegisterForm />
    </PageLayout>
  );
};

const PageLayout = styled.div`
  display: flex;
  justify-content: flex-start; /* 수정: 센터 정렬 대신 상단 정렬 */
  align-items: center;
  // height: 100vh;
`;

export default SignUp;
