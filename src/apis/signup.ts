// signup.ts
import { POST } from './api';

interface IUserRegisterInput {
  userName: string;
  email: string;
  password: string;
  nickname: string;
}

export const registerUser = async (registerInput: IUserRegisterInput) => {
  const { data } = await POST('/join', registerInput);
  return data;
};
