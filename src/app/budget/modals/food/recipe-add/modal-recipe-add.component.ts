import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { Recipe } from '../../../models/food';
import { Observable } from 'rxjs/Observable';
import { FormRecipeComponent } from '../../../forms/food/recipe/form-recipe.component';
import { FoodService } from '../../../services/food.service';
import { ModalBaseComponent } from '../../core/base/modal-base.component';
import { AppService } from '../../../services/app.service';

@Component({
    selector: 'budget-recipe-add-modal',
    templateUrl: './modal-recipe-add.component.html',
    styleUrls: ['./modal-recipe-add.component.scss']
})
export class ModalRecipeAddComponent extends ModalBaseComponent implements OnInit {

    @ViewChild(FormRecipeComponent)
    form: FormRecipeComponent;

    id: number;
    user: string;
    recipe: Recipe;
    loaded: boolean;
    label: string = 'Submit';


    constructor(
        public location: Location,
        public route: ActivatedRoute,
        public router: Router,
        public apiService: FoodService,
        public appService: AppService
    ) {
        super(location)
    }

    ngOnInit() {
        this.route.parent.params.subscribe(params => {
            this.user = params['user'];
        });
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.getData();
        });
    }

    getData() {
        if (this.id) {
            this.apiService.getRecipe(this.id).subscribe(recipe => {
                this.label = 'Update';
                this.recipe = recipe;
            });
        }
        else {
            this.loaded = true;
        }

    }

    onSubmit(item: Recipe) {
        if (this.recipe) {
            this.apiService.updateRecipe(item.id, item).subscribe(result => {
                this.appService.edit<Recipe>(item);
                this.closeModal();
            }, error => { this.form.throwError(error); });
        }
        else {
            this.apiService.addRecipe(item).subscribe(result => {
                this.appService.edit<Recipe>(item);
                this.closeModal();
            }, error => { this.form.throwError(error); });
        }
    }
    onDelete(item: Recipe) {
        this.apiService.deleteRecipe(item.id).subscribe(result => {
            this.router.navigate(['.', { outlets: { recipe: null } }], { relativeTo: this.route.parent });
        }, error => { this.form.throwError(error); });
    }



}
