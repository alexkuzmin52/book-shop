import { IBook } from '../book';

export interface ICartItem {
  book: IBook;
  count: number;
}
