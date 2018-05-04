import { NgModule } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Ng2CompleterModule } from 'ng2-completer';

// services
import { CoreService } from './services/core.service';
import { NavigationService } from './services/navigation.service';
import { FinanceService } from './services/finance.service';
import { FoodService } from './services/food.service';


// modules
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './services/auth.module';

// components
import { PanelGroceriesComponent } from './panels/food/groceries/groceries.component';
import { PanelGroceryCartComponent } from './panels/food/grocery-cart/grocery-cart.component';
import { PanelFoodProductsComponent } from './panels/food/food-products/food-products.component';
import { PanelRecipesComponent } from './panels/food/recipes/panel-recipes.component';
import { PanelMealPlansComponent } from './panels/food/meal-plans/meal-plans.component';

import { PanelGroceryControlsComponent } from './panels/food/grocery-controls/grocery-controls.component';
import { PanelRecipeControlsComponent } from './panels/food/recipe-controls/recipe-controls.component';

import { ModalRecipeIngredientsComponent } from './modals/food/recipe-ingredients/modal-recipe-ingredients.component';
import { ModalGroceriesComponent } from './modals/food/groceries/modal-groceries.component';
import { ModalRecipesComponent } from './modals/food/recipes/modal-recipes.component';
import { ModalRecipeAddComponent } from './modals/food/recipe-add/modal-recipe-add.component';
import { ModalGroceryListComponent } from './modals/food/grocery-list/modal-grocery-list.component';
import { ModalGroceryEditComponent } from './modals/food/grocery-edit/modal-grocery-edit.component';

import { FormGroceryComponent } from './forms/food/grocery/form-grocery.component';
import { FormRecipeComponent } from './forms/food/recipe/form-recipe.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AuthModule,
        CoreModule,
        RouterModule,
        FormsModule,
        Ng2CompleterModule

    ],
    declarations: [
        PanelGroceryCartComponent,
        PanelGroceriesComponent,
        PanelFoodProductsComponent,
        PanelRecipesComponent,
        PanelMealPlansComponent,

        PanelGroceryControlsComponent,
        PanelRecipeControlsComponent,

        ModalRecipeIngredientsComponent,
        ModalRecipesComponent,
        ModalRecipeAddComponent,
        ModalGroceryListComponent,
        ModalGroceryEditComponent,
        ModalGroceriesComponent,

        FormGroceryComponent,
        FormRecipeComponent
    ],
    exports: [
    ],
    providers: [
        CoreService,
        FinanceService,
        FoodService,
        NavigationService,
        DatePipe
    ]
})
export class FoodModule { }
