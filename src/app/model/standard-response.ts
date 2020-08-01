import {IHouse} from './ihouse';

export interface StandardResponse {
  success: boolean;
  message: string;
  data: IHouse;
}
