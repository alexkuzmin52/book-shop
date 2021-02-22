import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IBook } from '../../models';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent {
  @Input() selectedItem: IBook;
  @Output() changeAmountOfOrder = new EventEmitter<number>();
  @Output() deleteItemFromOrder = new EventEmitter<IBook>();

  onChangeAmountOfSelectedItem(event: any): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (event.target.valueAsNumber > this.selectedItem.stock) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.changeAmountOfOrder.emit(event.target.valueAsNumber);
  }

  onDeleteItem(selectedItem: IBook) {
    this.deleteItemFromOrder.emit(selectedItem);
  }
}
