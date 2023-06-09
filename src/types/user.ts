export interface IUserFollowInfo {
  nickname: string;
  follower: number;
  following: number;
}

export interface INewUserImage {
  nickname: string;
  image?: File;
  profileImg?: string;
  fileName?: string;
  contentType?: string;
}
