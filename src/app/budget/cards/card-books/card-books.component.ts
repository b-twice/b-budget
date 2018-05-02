import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../models';
import { CardBaseComponent } from '../card-base/card-base.component'
import { PersonalService } from '../../services/personal.service';


@Component({
  selector: 'budget-books-card',
  templateUrl: './card-books.component.html',
  styleUrls: ['./card-books.component.scss']
})
export class CardBooksComponent extends CardBaseComponent implements OnInit {

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
