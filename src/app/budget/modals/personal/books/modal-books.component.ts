import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../../models/personal';
import { ModalBaseComponent } from '../../core/base/modal-base.component'
import { PersonalService } from '../../../services/personal.service';


@Component({
  selector: 'budget-books-modal',
  templateUrl: './modal-books.component.html',
  styleUrls: ['./modal-books.component.scss']
})
export class ModalBooksComponent extends ModalBaseComponent implements OnInit {

  authorName: string;
  books: Observable<Book[]>;
  booksTotal: number = 0;

  constructor(
    public route: ActivatedRoute,
    public apiService: PersonalService,
    public location: Location
  ) {
    super(location)
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.authorName = params['name'];
      this.getData();
    })

  }

  getData() {
    this.books = this.apiService.getBooksByAuthor(this.authorName);
    this.books.subscribe(books => this.booksTotal = books.length);
  }


}
