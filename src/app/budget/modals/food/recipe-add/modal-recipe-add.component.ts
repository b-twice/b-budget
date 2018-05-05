import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { Recipe } from '../../../models/food';
import { Observable } from 'rxjs/Observable';
import { FormRecipeComponent } from '../../../forms/food/recipe/form-recipe.component';
import { FoodService } from '../../../services/food.service';
import { ModalBaseComponent } from '../../core/base/modal-base.component';


@Component({
    selector: 'budget-recipe-add-modal',
    templateUrl: './modal-recipe-add.component.html',
    styleUrls: ['./modal-recipe-add.component.scss']
})
export class ModalRecipeAddComponent extends ModalBaseComponent implements OnInit {

    @ViewChild(FormRecipeComponent)
    form: FormRecipeComponent;

    id: number;
    recipe: Recipe;
    loaded: boolean;
    label: string = 'Submit';


    constructor(
        public location: Location,
        public route: ActivatedRoute,
        public router: Router,
        public apiService: FoodService
    ) {
        super(location)
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.getData();
        })
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
            console.log('updating')
            this.apiService.updateRecipe(item.id, item).subscribe(result => {
                this.closeModal();
            }, error => { console.log(error); });
        }
        else {
            console.log('adding')
            this.apiService.addRecipe(item).subscribe(result => {
                this.closeModal();
            }, error => { console.log(error); });
        }
    }
    onDelete(item: Recipe) {
        console.log('deleting')
        this.apiService.deleteRecipe(item.id).subscribe(result => {
            this.router.navigate(['.', { outlets: { recipe: null } }], { relativeTo: this.route.parent });
        }, error => { console.log(error); });
    }



}
