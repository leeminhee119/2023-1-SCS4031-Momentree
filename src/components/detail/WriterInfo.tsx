import styled from 'styled-components';
import { useUserInfoQuery } from 'hooks/queries/useUser';
import { useCookies } from 'react-cookie';
import defaultProfileIcon from '../../assets/icons/profile_white.svg';

const WriterInfo = () => {
  const [cookies] = useCookies(['user']);
  const { data } = useUserInfoQuery(cookies?.user?.userToken);

  return (
    <WriterInfoContainer>
      <div>
        <img src={data?.result.profileImg ? data?.result.profileImg : defaultProfileIcon} alt="유저 이미지" />
        <Info>
          <h1>{data?.result.nickname}</h1>
          <p>
            글 {data?.result.recordCnt} · 팔로워 {data?.result.follower}
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
