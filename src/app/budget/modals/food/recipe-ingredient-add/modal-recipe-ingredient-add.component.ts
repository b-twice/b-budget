import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { RecipeIngredient } from '../../../models/food';
import { Observable } from 'rxjs/Observable';
import { FormRecipeIngredientComponent } from '../../../forms/food/recipe-ingredient/form-recipe-ingredient.component';
import { FoodService } from '../../../services/food.service';
import { ModalBaseComponent } from '../../core/base/modal-base.component';
import { AppService } from '../../../services/app.service';


@Component({
    selector: 'budget-recipe-ingredient-add-modal',
    templateUrl: './modal-recipe-ingredient-add.component.html',
    styleUrls: ['./modal-recipe-ingredient-add.component.scss']
})
export class ModalRecipeIngredientAddComponent extends ModalBaseComponent implements OnInit {

    @ViewChild(FormRecipeIngredientComponent)
    form: FormRecipeIngredientComponent;

    id: number;
    recipeIngredient: RecipeIngredient;
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
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.getData();
        });
    }

    getData() {
        if (this.id) {
            this.apiService.getRecipeIngredient(this.id).subscribe(ingredient => {
                this.label = 'Update';
                this.recipeIngredient = ingredient;
            });
        }
        else {
            this.loaded = true;
        }

    }

    onSubmit(item: RecipeIngredient) {
        if (this.recipeIngredient) {
            this.apiService.updateRecipeIngredient(item.id, item).subscribe(result => {
                this.appService.edit<RecipeIngredient>(item);
                this.closeModal();
            }, error => { console.log(error); });
        }
        else {
            this.apiService.addRecipeIngredient(item).subscribe(result => {
                this.appService.edit<RecipeIngredient>(item);
                this.closeModal();
            }, error => { console.log(error); });
        }
    }
    onDelete(item: RecipeIngredient) {
        this.apiService.deleteRecipeIngredient(item.id).subscribe(result => {
            this.closeModal();
        }, error => { console.log(error); });
    }



}
