import styled from 'styled-components';

export const AddFollowerButton = styled.button`
  width: 65px;
  height: 26px;

  border-radius: 99px;
  color: ${({ theme }) => theme.colors.gray900};
  background-color: ${({ theme }) => theme.colors.gray300};
  ${({ theme }) => theme.fonts.caption1};

  cursor: pointer;
`;
export const CancelFollowButton = styled.button`
  width: 65px;
  height: 26px;

  border-radius: 99px;
  color: ${({ theme }) => theme.colors.mainLight};
  background-color: ${({ theme }) => theme.colors.gray100};
  border: 1.5px solid ${({ theme }) => theme.colors.mainLight};
  ${({ theme }) => theme.fonts.caption1};

  cursor: pointer;
`;
