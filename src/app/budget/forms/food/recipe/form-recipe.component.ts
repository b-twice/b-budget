import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompleterService, CompleterData, CompleterCmp } from 'ng2-completer';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { Cookbook, Recipe } from '../../../models/food';
import { Category } from '../../../models/core';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { FormBaseComponent } from '../../core/base/form-base.component';

@Component({
    selector: 'budget-form-recipe',
    templateUrl: './form-recipe.component.html',
    styleUrls: ['./form-recipe.component.scss']
})
export class FormRecipeComponent extends FormBaseComponent implements OnInit {

    @Input() recipe: Recipe;
    @Input() user: string;

    model: Recipe = new Recipe(0, null, null, null, null);
    recipeCategories: Observable<Category[]>;
    cookbooks: Observable<Cookbook[]>;
    recipeCategoriesService: CompleterData;
    cookbooksService: CompleterData;
    @Output() onSubmit = new EventEmitter<Recipe>();
    @Output() onDelete = new EventEmitter<Recipe>();

    constructor(
        public route: ActivatedRoute,
        public apiService: FoodService,
        public completerService: CompleterService
    ) {
        super(route)
    }

    ngOnInit() {
        forkJoin(
            this.apiService.getCookbooks(),
            this.apiService.getRecipeCategories()
        ).subscribe(data => {
            this.cookbooksService = this.completerService.local(data[0], 'title', 'title');
            this.recipeCategoriesService = this.completerService.local(data[1], 'name', 'name');
            if (this.recipe) {
                this.model = this.recipe
            }
        })
    }

    beforeSubmit() {
        this.model.user = this.model.user ? this.model.user : this.user;
    }

}

