import { ElementRef, Injectable } from '@angular/core';

import { CategoryEnum } from '../constants';
import { IBook } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor() {
    console.log('appService');
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getBookCategory(num: number): CategoryEnum {
    switch (num) {
      case 1:
        return CategoryEnum.CATEGORY1;
      case 2:
        return CategoryEnum.CATEGORY2;
      case 3:
        return CategoryEnum.CATEGORY3;
      case 4:
        return CategoryEnum.CATEGORY4;
      case 5:
        return CategoryEnum.CATEGORY5;
      default:
        return CategoryEnum.CATEGORY5;
    }
  }

  private InitBook(): IBook {
    return {
      id: 0,
      name: '',
      description: '',
      price: 0,
      category: CategoryEnum.CATEGORY1,
      createDate: 0,
      stock: 0,
      orderCount: 0,
      isAvailable: true,
    };
  }

  createBooksList(): IBook[] {
    const arr: IBook[] = [];

    for (let i = 0; i < 10; i++) {
      const book: IBook = this.InitBook();
      const numberCategory = this.getRandomInt(1, 6);
      book.id = i;
      book.name = `Name${i + 1}`;
      book.description = `Description${i + 1}`;
      book.price = (i + 30) * (i + 2);
      book.category = this.getBookCategory(numberCategory);
      book.createDate = Math.floor(Math.random() * (2020 - 1900) + 1900);
      book.stock = this.getRandomInt(1, 10);
      book.orderCount = 0;
      book.isAvailable = true;
      arr[i] = book;
    }
    return arr;
  }

  addBookToOrder(
    book: IBook,
    books: IBook[],
    numberItems: ElementRef
  ): IBook[] {
    if (book.stock <= book.orderCount) {
      book.isAvailable = false;
      return;
    }

    const index = books.findIndex((value) => value.name === book.name);

    if (index === -1) {
      book.orderCount += 1;
      books.push(book);
      numberItems.nativeElement.textContent++;
    } else {
      books[index].orderCount += 1;
    }
    return books;
  }

  updateBookByOrderCount(book: IBook, order: IBook[]): void {
    if (book.stock > book.orderCount) {
      book.isAvailable = true;
    }
    const index = order.findIndex((value) => value.id === book.id);
    if (index !== -1) {
      order[index].orderCount = book.orderCount;
    }
  }

  deleteBookFromOrder(book: IBook, order: IBook[], numberItems: ElementRef) {
    const index = order.findIndex((value) => value.id === book.id);
    if (index !== -1) {
      order.splice(index, 1);
      numberItems.nativeElement.textContent--;
    }
  }

  getTotalPrice(order: IBook[]): number {
    let total = 0;
    for (const iBook of order) {
      total += iBook.orderCount * iBook.price;
    }
    return total;
  }
}
