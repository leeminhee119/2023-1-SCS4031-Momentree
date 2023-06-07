import styled from 'styled-components';
import defaultProfileIcon from '../../assets/icons/profile_white.svg';
import { AddFollowerButton, CancelFollowButton } from 'components/common/styled-components';
import { usePostFollowMutation } from 'hooks/queries/useUser';
import { useMyFollowingUserListQuery } from 'hooks/queries/useMyPage';
import { useCookies } from 'react-cookie';
import { IUserFollowInfo } from 'types/user';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface WriterInfoProps {
  profileImg: string;
  nickname: string;
  recordCnt: number;
  followerCnt: number;
}
const WriterInfo = ({ profileImg, nickname, recordCnt, followerCnt }: WriterInfoProps) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['user']);
  const postFollow = usePostFollowMutation(
    {
      nickName: nickname,
    },
    cookies?.user?.userToken
  );

  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  //TODO: useCommunityDetailQuery의 데이터에 나의 팔로우 여부 데이터 추가되면 아래 코드 삭제
  const { data } = useMyFollowingUserListQuery(cookies?.user?.userToken);
  useEffect(() => {
    if (data) {
      const copy = data.result.map((user: IUserFollowInfo) => {
        return user.nickname;
      });
      if (copy.includes(nickname)) {
        setIsFollowing(true);
      }
    }
  }, [data]);

  const handleClickFollowBtn = () => {
    setIsFollowing(() => !isFollowing);
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
      {isFollowing ? (
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
