import React from 'react';
import styled from 'styled-components';

interface ToastMessageProps {
  text: string;
}

export default function ToastMessage({ text }: ToastMessageProps) {
  return <StyledToastMessage>{text}</StyledToastMessage>;
}
const StyledToastMessage = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 auto;

  width: 18.7rem;
  height: 3.8rem;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 8rem;

  color: ${({ theme }) => theme.colors.gray200};
  background-color: ${({ theme }) => theme.colors.main900};
  border-radius: 0.8rem;
  ${({ theme }) => theme.fonts.body4};

  animation: fadeInUp 2s forwards;
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateZ(0);
    }
  }
`;
