import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'budget-panel-recipe-controls',
  templateUrl: './recipe-controls.component.html',
  styleUrls: ['./recipe-controls.component.scss']
})
export class PanelRecipeControlsComponent implements OnInit {

  user: string;
  year: string;
  searchValue: string;
  @ViewChild('searchBox') searchBox: ElementRef;
  @Output() onSearch = new EventEmitter<string>();

  constructor(
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.user = params['user'];
        this.year = params['year'];
      }
    )

  }

  search() {
    let searchValue = this.searchBox.nativeElement.value;
    this.searchValue = searchValue;
    this.onSearch.emit(searchValue);
  }


}

