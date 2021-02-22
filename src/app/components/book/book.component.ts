import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IBook } from '../../models';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent {
  @Input() ListOfBooks: IBook[];
  @Output() buyBook = new EventEmitter<IBook>();

  onBuy(book: IBook): void {
    this.buyBook.emit(book);
  }
}
