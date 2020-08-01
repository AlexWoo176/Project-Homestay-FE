import {IHouse} from './ihouse';
import {ImageOfHouse} from './image-of-house';

export class HouseRequest {
  house: Partial<IHouse>;
  images: ImageOfHouse;

  constructor(house, image) {
    this.house = house;
    this.images = image;
  }
}
