import { Component, OnInit, ViewChild } from '@angular/core';
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


    constructor(
        public location: Location,
        public apiService: FoodService
    ) {
        super(location)
    }

    ngOnInit() {
    }


    onSubmit(item: Recipe) {
        this.apiService.addRecipe(item).subscribe(result => {
            this.closeModal();
        }, error => { console.log(error); });

    }

}
