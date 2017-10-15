import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UserBook } from '../../models';


@Component({
  selector: 'budget-books-card',
  templateUrl: './card-books.component.html',
  styleUrls: ['./card-books.component.scss']
})
export class CardBooksComponent implements OnInit {

  @Input() author: string;
  @Input() books: UserBook[];
  @Output() onModalClose = new EventEmitter();
  booksTotal: number = 0;
  sortProperty: string;
  sortDesc: boolean = false;

  constructor() { }

  ngOnInit() {
    this.booksTotal = this.books.length;
  }

  closeModal() {
    this.onModalClose.emit();
  }

  stopPropogation(event): void { event.stopPropagation(); }

  sort(sortProperty: string) {
    if (this.sortProperty === sortProperty) this.sortDesc = !this.sortDesc;
    else this.sortDesc = false;
    this.sortProperty = sortProperty;
  }


}
