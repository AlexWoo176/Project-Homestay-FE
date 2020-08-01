import {IHouse} from './ihouse';
import {IUser} from './iuser';

export class OrderHouse {
  id: number;
  checkin: Date;
  checkout: Date;
  numberGuest: number;
  cost: number;
  orderTime: Date;
  house: IHouse;
  tenant: IUser;
  statusOrder: string;
}
