import {IRole} from './irole';

export interface IUser {
  id: number;
  username: string;
  password: string;
  name: string;
  email: string;
  role: IRole;
  avatar: string;
}
