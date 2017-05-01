import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BudgetService } from '../services/budget.service';
import { SelectIconService } from '../../shared/select-icon/select-icon.service';
import { Category } from '../models';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'budget-filter-controls',
  templateUrl: './filter-controls.component.html',
  styleUrls: ['./filter-controls.component.scss']
})
export class FilterControlsComponent implements OnInit {

  @Output() onCategoryChange = new EventEmitter();
  userCategories: string[] = [];
  clearActive: boolean = false;
  categories: Observable<Category[]>;

  constructor(
    public budgetService: BudgetService,
    public selectIconService: SelectIconService
  ) { }

  ngOnInit() {
    this.categories = this.budgetService.getCategories();
  }

  categorySelect(category: Category) {
    let inList: number = this.userCategories.indexOf(category.name);
    // toggle, if not in list, add, if in list, remove
    if (inList == -1) {
      this.userCategories.push(category.name);
    }
    else {
      this.userCategories.splice(inList, 1);
    };
    this.clearActive = this.userCategories.length > 0 ? true : false;
    this.onCategoryChange.emit();
  }

  categoryClear() {
    this.userCategories = [];
    this.selectIconService.requestClear(true);
    this.onCategoryChange.emit();
    this.clearActive = false;
  }

}
