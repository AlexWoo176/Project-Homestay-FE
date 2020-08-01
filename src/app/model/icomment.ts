import {IUser} from './iuser';
import {IHouse} from './ihouse';

export interface IComment {
  id: number;
  user: IUser;
  comment: string;
  house: IHouse;
}
