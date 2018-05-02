import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonalService } from '../../services/personal.service';
import { Book, Category } from '../../models';
import { Observable } from 'rxjs/Observable';
import { FilterControlsComponent } from '../../filter-controls/filter-controls.component';
import { NavigationService } from '../../services/navigation.service';
import { PanelBaseComponent } from '../panel-base/panel-base.component'

@Component({
  selector: 'budget-panel-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class PanelBooksComponent extends PanelBaseComponent implements OnInit {

  books: Observable<Book[]>;
  bookCategories: Observable<Category[]>;

  @ViewChild(FilterControlsComponent)
  private filterControls: FilterControlsComponent;

  constructor(
    public route: ActivatedRoute,
    public apiService: PersonalService,
    public navigationService: NavigationService
  ) {
    super(route, navigationService);
  }

  ngOnInit() {
    this.resolveRoutes();
    this.bookCategories = this.apiService.getBookCategories();
  }

  getData(): void {
    this.books = this.apiService.getBooks(this.user, this.year, this.filterControls.activeCategories);
  }

}


