import styled from 'styled-components';
import defaultProfileIcon from '../../assets/icons/profile_white.svg';
import { AddFollowerButton, CancelFollowButton } from 'components/common/styled-components';
import { usePostFollowMutation } from 'hooks/queries/useUser';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface WriterInfoProps {
  profileImg: string;
  nickname: string;
  recordCnt: number;
  followerCnt: number;
  isFollowing: number;
}
const WriterInfo = ({ profileImg, nickname, recordCnt, followerCnt, isFollowing }: WriterInfoProps) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['user']);
  const postFollow = usePostFollowMutation(
    {
      nickname: nickname,
    },
    cookies?.user?.userToken
  );

  const [isFollowingWriter, setIsFollowingWriter] = useState<number>(isFollowing);

  useEffect(() => {
    if (isFollowing) {
      setIsFollowingWriter(() => isFollowing);
    }
  }, [isFollowing]);

  const handleClickFollowBtn = () => {
    setIsFollowingWriter(() => {
      if (isFollowing == 1) return 0;
      else return 1;
    });
    postFollow.mutate();
  };
  return (
    <WriterInfoContainer>
      <div>
        <img src={profileImg ? profileImg : defaultProfileIcon} alt="유저 이미지" />
        <Info>
          <h1 onClick={() => navigate(`/user/${nickname}`)}>{nickname}</h1>
          <p>
            글 {recordCnt} · 팔로워 {followerCnt}
          </p>
        </Info>
      </div>
      {isFollowingWriter == 1 ? (
        <CancelFollowButton type="button" onClick={handleClickFollowBtn}>
          팔로잉
        </CancelFollowButton>
      ) : (
        <AddFollowerButton type="button" onClick={handleClickFollowBtn}>
          {' '}
          + 팔로우{' '}
        </AddFollowerButton>
      )}
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
    cursor: pointer;
  }

  p {
    color: ${({ theme }) => theme.colors.gray400};
    ${({ theme }) => theme.fonts.caption2};
  }
`;
