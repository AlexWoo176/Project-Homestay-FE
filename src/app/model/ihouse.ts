import {OrderHouse} from './order-house';
import {CategoryOfHouse} from './category-of-house';

export class IHouse {
  id: number;
  houseName: string;
  category: string;
  address: string;
  imageUrls: string[];
  orderHouses: OrderHouse[];
  bedroomNumber: number;
  bathroomNumber: number;
  price: number;
  description: string;
  rate: number;
  area: number;
}
