import styled from 'styled-components';
import defaultProfileIcon from '../../assets/icons/profile_white.svg';

interface WriterInfoProps {
  profileImg: string;
  nickname: string;
  recordCnt: number;
  followerCnt: number;
}
const WriterInfo = ({ profileImg, nickname, recordCnt, followerCnt }: WriterInfoProps) => {
  return (
    <WriterInfoContainer>
      <div>
        <img src={profileImg ? profileImg : defaultProfileIcon} alt="유저 이미지" />
        <Info>
          <h1>{nickname}</h1>
          <p>
            글 {recordCnt} · 팔로워 {followerCnt}
          </p>
        </Info>
      </div>
      <AddFollowerButton type="button"> + 팔로우 </AddFollowerButton>
    </WriterInfoContainer>
  );
};
export default WriterInfo;

const WriterInfoContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.6rem;
  background-color: ${({ theme }) => theme.colors.gray200};
  border-radius: 12px;
  height: 5.8rem;

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 10px;
  }

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const Info = styled.article`
  h1 {
    color: ${({ theme }) => theme.colors.gray900};
    ${({ theme }) => theme.fonts.subtitle2};
  }

  p {
    color: ${({ theme }) => theme.colors.gray400};
    ${({ theme }) => theme.fonts.caption2};
  }
`;

const AddFollowerButton = styled.button`
  width: 65px;
  height: 26px;

  border-radius: 99px;
  color: ${({ theme }) => theme.colors.gray900};
  background-color: ${({ theme }) => theme.colors.gray300};
  ${({ theme }) => theme.fonts.caption1};

  cursor: pointer;
`;
