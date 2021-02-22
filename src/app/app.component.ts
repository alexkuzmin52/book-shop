import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { IBook } from './models';
import { AppService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('myTitle') myTitle: ElementRef;
  @ViewChild('numberItems') numberItems: ElementRef;

  title = 'bookShop';
  listOfBooks: IBook[];
  order: IBook[] = [];
  showCart = false;
  totalPrice = 0;
  labelButtonCart = 'show';

  constructor(private appService: AppService) {
    this.listOfBooks = appService.createBooksList();
  }
  ngAfterViewInit(): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.myTitle.nativeElement.textContent = 'This is Task#1';
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.numberItems.nativeElement.textContent = 0;
  }

  onBuyBook(book: IBook): void {
    this.appService.addBookToOrder(book, this.order, this.numberItems);
    this.totalPrice = this.appService.getTotalPrice(this.order);
  }

  onShowCart(): void {
    this.showCart = !this.showCart;
    this.showCart
      ? (this.labelButtonCart = 'hide')
      : (this.labelButtonCart = 'show');
  }

  onChangedAmountOrderBook(book: IBook): void {
    this.appService.updateBookByOrderCount(book, this.order);
    this.totalPrice = this.appService.getTotalPrice(this.order);
  }

  onDeleteBookFromOrder(book: IBook): void {
    this.appService.deleteBookFromOrder(book, this.order, this.numberItems);
    this.totalPrice = this.appService.getTotalPrice(this.order);
  }
}
