import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonalService } from '../../services/personal.service';
import { Book } from '../../models';
import { Category } from '../../models';
import { Observable } from 'rxjs/Observable';
import { FilterControlsComponent } from '../../filter-controls/filter-controls.component';
import { PanelChartService } from '../panel-chart/panel-chart.service';

@Component({
  selector: 'budget-panel-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class PanelBooksComponent implements OnInit {

  Books: Observable<Book[]>;
  booksTotal: number = 0;
  bookCategories: Observable<Category[]>;
  sortProperty: string;
  sortDesc: boolean = false;
  user: string;
  year: string;
  selectedBooks: Book[];
  selectedAuthor: string;

  @ViewChild(FilterControlsComponent)
  private filterControls: FilterControlsComponent;

  constructor(
    public route: ActivatedRoute,
    public apiService: PersonalService,
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(
      params => {
        this.user = params['user'];
        this.year = params['year'];
        this.getBooks();
      }
    )
    this.bookCategories = this.apiService.getBookCategories();
  }

  getBooks(): void {
    if (!this.user) { return; }
    if (!this.year) { return; }
    this.Books = this.apiService.getBooks(this.user, this.year, this.filterControls.activeCategories);
  }

  sort(sortProperty: string) {
    if (this.sortProperty === sortProperty) this.sortDesc = !this.sortDesc;
    else this.sortDesc = false;
    this.sortProperty = sortProperty;
  }

  categoryChange() {
    this.getBooks();
  }

  getBooksByAuthor(name: string) {
    this.selectedAuthor = name;
    this.apiService.getBooksByAuthor(name).subscribe(books => { this.selectedBooks = books });
    return
  }
  modalClose() {
    this.selectedAuthor = null;
    this.selectedBooks = null;
  }

}


