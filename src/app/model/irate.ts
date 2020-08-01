import {IUser} from './iuser';
import {IHouse} from './ihouse';

export interface IRate {
  id: number;
  user: IUser;
  ratePoint: number;
  house: IHouse;
}
