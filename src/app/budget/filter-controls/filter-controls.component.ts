import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
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
  activeCategories: string[] = [];
  clearActive: boolean = false;
  @Input() categories: Observable<Category[]>;

  constructor(
    public budgetService: BudgetService,
    public selectIconService: SelectIconService
  ) { }

  ngOnInit() {
  }

  categorySelect(category: Category) {
    let inList: number = this.activeCategories.indexOf(category.name);
    // toggle, if not in list, add, if in list, remove
    if (inList == -1) {
      this.activeCategories.push(category.name);
    }
    else {
      this.activeCategories.splice(inList, 1);
    };
    this.clearActive = this.activeCategories.length > 0 ? true : false;
    this.onCategoryChange.emit();
  }

  categoryClear() {
    this.activeCategories = [];
    this.selectIconService.requestClear(true);
    this.onCategoryChange.emit();
    this.clearActive = false;
  }

}
