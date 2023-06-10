import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useMyFollowingUserListQuery } from 'hooks/queries/useMyPage';
import { usePostFollowMutation } from 'hooks/queries/useUser';
import styled from 'styled-components';
import backIcon from '../assets/icons/left.svg';
import profileIcon from '../assets/icons/profile_grey.svg';
import { AddFollowerButton } from 'components/common/styled-components';
import { CancelFollowButton } from 'components/common/styled-components';
import { IUserFollowInfo } from 'types/user';
import Blank from 'components/common/Blank';
import { useNavigate } from 'react-router-dom';

const FollowList = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['user']);
  const [showFollowingList, setShowFollowingList] = useState<boolean>(true);
  const { data } = useMyFollowingUserListQuery(cookies.user.userToken);
  const [targetUserNickname, setTargetUserNickname] = useState('');
  const postFollowUnfollowMutation = usePostFollowMutation({ nickname: targetUserNickname }, cookies?.user?.userToken);
  const [isFollowingUsers, setIsFollowingUsers] = useState<number[]>([]); // 팔로우 여부를 1 또는 0으로 담습니다. 초기엔 전부 1입니다.
  useEffect(() => {
    if (data) {
      setIsFollowingUsers(() => new Array(data?.result.length).fill(1));
    }
  }, [data]);

  const handleFollowUnfollow = (nickname: string, userIdx: number) => {
    const newIsFollowingUsers = isFollowingUsers;
    if (newIsFollowingUsers[userIdx] == 0) newIsFollowingUsers[userIdx] = 1;
    else newIsFollowingUsers[userIdx] = 0;
    setTargetUserNickname(nickname);
    setIsFollowingUsers(newIsFollowingUsers);
    postFollowUnfollowMutation.mutateAsync();
  };

  const tempFollowersData: IUserFollowInfo[] = [
    {
      nickname: '융융이',
      imgUrl: '#',
      follower: 324,
      following: 123,
    },
    {
      nickname: '이구역맛잘알',
      imgUrl: '#',
      follower: 324,
      following: 123,
    },
    {
      nickname: '데이트광',
      imgUrl: '#',
      follower: 324,
      following: 123,
    },
  ];
  return (
    <FollowListLayout>
      <FollowListHeader>
        <BackIcon src={backIcon} alt="뒤로가기 아이콘" onClick={() => navigate(-1)} />
        {/* <h1></h1> */}
      </FollowListHeader>
      <TypeSelectBox>
        {/* <TypeButton isActive={!showFollowingList} onClick={() => setShowFollowingList(false)}>
          팔로워
        </TypeButton> */}
        <TypeButton isActive={showFollowingList} onClick={() => setShowFollowingList(true)}>
          팔로잉
        </TypeButton>
      </TypeSelectBox>
      {data?.result.length !== 0 ? (
        <UsersList>
          {showFollowingList
            ? data?.result.map((userInfo: IUserFollowInfo, userIdx: number) => {
                return (
                  <UserListItem>
                    <UserInfoBox>
                      <UserProfileImg src={userInfo.imgUrl ? userInfo.imgUrl : profileIcon} alt="기본 프로필 아이콘" />
                      <UserTextInfo>
                        <div onClick={() => navigate(`/user/${userInfo.nickname}` as const)}>{userInfo.nickname}</div>
                        <div id="userSubInfo">
                          <div>팔로워 {userInfo.follower}</div>
                          <div>팔로잉 {userInfo.following}</div>
                        </div>
                      </UserTextInfo>
                    </UserInfoBox>
                    {isFollowingUsers[userIdx] ? (
                      <CancelFollowButton onClick={() => handleFollowUnfollow(userInfo.nickname, userIdx)}>
                        팔로잉
                      </CancelFollowButton>
                    ) : (
                      <AddFollowerButton onClick={() => handleFollowUnfollow(userInfo.nickname, userIdx)}>
                        팔로우
                      </AddFollowerButton>
                    )}
                  </UserListItem>
                );
              })
            : tempFollowersData.map((userInfo: IUserFollowInfo) => {
                return (
                  <UserListItem>
                    <UserInfoBox>
                      <UserProfileImg src={profileIcon} alt="기본 프로필 아이콘" />
                      <UserTextInfo>
                        <div>{userInfo.nickname}</div>
                        <div id="userSubInfo">
                          <div>팔로워 {userInfo.follower}</div>
                          <div>팔로잉 {userInfo.following}</div>
                        </div>
                      </UserTextInfo>
                    </UserInfoBox>
                    <AddFollowerButton>팔로우</AddFollowerButton>
                  </UserListItem>
                );
              })}
        </UsersList>
      ) : (
        <Blank message1="팔로우 중인 유저가 없습니다." />
      )}
    </FollowListLayout>
  );
};
export default FollowList;

const FollowListLayout = styled.div``;
const FollowListHeader = styled.section`
  display: flex;
  justify-content: space-between;
`;
const BackIcon = styled.img`
  width: 19.67px;
  height: 16.67px;
  cursor: pointer;
`;
const TypeSelectBox = styled.section`
  margin: 1rem 0;
  display: flex;
`;
const TypeButton = styled.button<{ isActive: boolean }>`
  ${({ theme }) => theme.fonts.body3};
  color: ${({ isActive, theme }) => (isActive ? theme.colors.mainDark : theme.colors.gray400)};
  border-bottom: ${({ isActive }) => (isActive ? '1.5px' : '1px')} solid
    ${({ isActive, theme }) => (isActive ? theme.colors.mainDark : theme.colors.gray300)};
  width: 100%;
  padding: 1rem;
`;

const UsersList = styled.ul``;
const UserListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 6rem;
`;
const UserInfoBox = styled.div`
  display: flex;
  align-items: center;
`;
const UserProfileImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 10px;
`;
const UserTextInfo = styled.div`
  ${({ theme }) => theme.fonts.body3};
  div#userSubInfo {
    display: flex;
    gap: 10px;
    ${({ theme }) => theme.fonts.caption3};
    color: ${({ theme }) => theme.colors.gray400};
  }
`;
