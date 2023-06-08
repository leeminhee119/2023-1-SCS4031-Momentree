export interface IUserFollowInfo {
  nickname: string;
  follower: number;
  following: number;
}

export interface INewUserImage {
  nickname: string;
  image?: File;
  imgFormData?: string;
  fileName?: string;
  contentType?: string;
}
