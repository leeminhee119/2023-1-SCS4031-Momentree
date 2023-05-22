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

const PageLayout = styled.div``;

export default SignUp;
