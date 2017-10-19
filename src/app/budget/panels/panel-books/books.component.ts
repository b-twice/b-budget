import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../../services/budget.service';
import { UserBook } from '../../models';
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

  userBooks: Observable<UserBook[]>;
  booksTotal: number = 0;
  bookCategories: Observable<Category[]>;
  sortProperty: string;
  sortDesc: boolean = false;
  user: string;
  year: string;
  selectedBooks: UserBook[];
  selectedAuthor: string;

  @ViewChild(FilterControlsComponent)
  private filterControls: FilterControlsComponent;

  constructor(
    public route: ActivatedRoute,
    public budgetService: BudgetService,
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(
      params => {
        this.user = params['user'];
        this.year = params['year'];
        this.getBooks();
      }
    )
    this.bookCategories = this.budgetService.getBookCategories();
  }

  getBooks(): void {
    if (!this.user) { return; }
    if (!this.year) { return; }
    this.userBooks = this.budgetService.getUserBooks(this.user, this.year, this.filterControls.activeCategories);
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
    this.budgetService.getBooksByAuthor(name).subscribe(books => { this.selectedBooks = books });
    return
  }
  modalClose() {
    this.selectedAuthor = null;
    this.selectedBooks = null;
  }

}


