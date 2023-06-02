import React from 'react';
import styled from 'styled-components';
import blankIcon from '../../assets/icons/blank.svg';
import theme from '../../styles/theme';

const BlankIcon = styled.img`
  color: ${theme.colors.gray200};
  width: 4.2rem;
  height: 4.2rem;
  margin-bottom: 3em;
`;

const BlankText = styled.p`
  font: ${theme.fonts.body2};
  color: ${theme.colors.gray600};
  text-align: center;
  margin-top: 0.4rem 0rem;
`;

const BlankContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
`;

interface BlankProps {
  message1: string;
  message2?: string;
}

const Blank: React.FC<BlankProps> = ({ message1, message2 }) => (
  <BlankContainer>
    <BlankIcon src={blankIcon} alt="데이터 없음" />
    <BlankText>{message1}</BlankText>
    <BlankText>{message2}</BlankText>
  </BlankContainer>
);

export default Blank;
