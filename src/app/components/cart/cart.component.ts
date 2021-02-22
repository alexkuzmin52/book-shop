import { EventEmitter, Component, Input, OnInit, Output } from '@angular/core';

import { IBook } from '../../models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  @Input() cart: IBook[];
  @Input() showCart: boolean;
  @Input() totalPrice: number;

  @Output() changedAmountOrderBook = new EventEmitter<IBook>();
  @Output() deleteBookFromOrder = new EventEmitter<IBook>();

  selectedBookFromCart: IBook;
  beginStock: number;

  constructor() {}

  ngOnInit(): void {}

  onEditItem(book: IBook): void {
    this.selectedBookFromCart = book;
    this.beginStock = book.stock;
  }

  onChangeAmountOfOrder(event: number): void {
    this.selectedBookFromCart.orderCount = event;
    this.changedAmountOrderBook.emit(this.selectedBookFromCart);
  }

  onDeleteItemFromOrder(event: IBook) {
    this.deleteBookFromOrder.emit(event);
    this.selectedBookFromCart = null;
  }
}
