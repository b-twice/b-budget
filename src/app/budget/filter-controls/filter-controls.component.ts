import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() clearOnChange: boolean = false; // force clear on cat change

  constructor(
    public selectIconService: SelectIconService
  ) { }

  ngOnInit() {
  }

  categorySelect(category: Category) {
    let inList: number = this.activeCategories.indexOf(category.name);
    // force clear categories if clearOnChange is true, meaning whenever changing categories clear out the others
    // only one category active at a time
    if (this.activeCategories.length > 0 && this.clearOnChange && inList == -1) {
      this.activeCategories = [];
      this.selectIconService.requestClear(category.name);
      this.activeCategories.push(category.name);
    }
    // toggle, if not in list, add, if in list, remove
    else if (inList == -1) {
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
    this.selectIconService.requestClear(null);
    this.onCategoryChange.emit();
    this.clearActive = false;
  }

}
