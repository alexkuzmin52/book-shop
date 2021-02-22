import { CategoryEnum } from '../../constants';

export interface IBook {
  id: number;
  name: string;
  description: string;
  price: number;
  category: CategoryEnum;
  createDate: number;
  stock: number;
  orderCount: number;
  isAvailable: boolean;
}
