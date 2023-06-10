export interface IUserFollowInfo {
  nickname: string;
  follower: number;
  following: number;
  imgUrl: string;
}

export interface INewUserImage {
  nickname: string;
  image?: File;
  profileImg?: string;
  fileName?: string;
  contentType?: string;
}
