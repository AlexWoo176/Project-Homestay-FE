import {IHouse} from './ihouse';

export interface IStatusHouse {
  id: number;
  house: IHouse;
  startDate: Date;
  endDate: Date;
}
