import {IHouse} from './ihouse';

export class ImageOfHouse {
  id: number;
  imageUrl: string;
  house: Partial<IHouse>;

  constructor() {
  }
}
