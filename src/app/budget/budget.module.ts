import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ng2CompleterModule } from 'ng2-completer';
import { DatePipe, CommonModule } from '@angular/common';

import { BudgetRoutingModule } from './budget-routing.module';

import { CoreService } from './services/core.service';
import { FinanceService } from './services/finance.service';
import { FoodService } from './services/food.service';
import { PersonalService } from './services/personal.service';
import { NavigationService } from './services/navigation.service';

//shared
import { SharedModule } from '../shared/shared.module';

import { BudgetDashboardComponent } from './dashboard.component';
import { HeaderComponent } from './header/header.component';
import { PanelSummaryComponent } from './panels/panel-summary/summary.component';
import { PanelCategoriesComponent } from './panels/panel-categories/categories.component';
import { PanelTransactionsComponent } from './panels/panel-transactions/transactions.component';
import { PanelExpensesComponent } from './panels/panel-expenses/expenses.component';
import { PanelBooksComponent } from './panels/panel-books/books.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { YearNavComponent } from './year-nav/year-nav.component';
import { PanelNavComponent } from './panel-nav/panel-nav.component';
import { AuthModule } from './services/auth.module';

import { UserProfileTransformPipe } from './user-profile/user-profile-transform.pipe';
import { CategoriesTransformPipe } from './panels/panel-categories/categories-transform.pipe';
import { FilterControlsComponent } from './filter-controls/filter-controls.component';
import { PanelChartComponent } from './panels/panel-chart/panel-chart.component';
import { PanelChartService } from './panels/panel-chart/panel-chart.service';
import { PanelSummaryChartComponent } from './panels/panel-summary-chart/summary-chart.component';
import { PanelSpendingChartComponent } from './panels/panel-spending-chart/spending-chart.component';
import { PanelGroceriesComponent } from './panels/panel-groceries/groceries.component';
import { PanelGroceryCartComponent } from './panels/panel-grocery-cart/grocery-cart.component';
import { PanelGroceryControlsComponent } from './panels/panel-grocery-controls/grocery-controls.component';
import { PanelFoodProductsComponent } from './panels/panel-food-products/food-products.component';
import { PanelRecipesComponent } from './panels/panel-recipes/panel-recipes.component';
import { PanelMealPlansComponent } from './panels/panel-meal-plans/meal-plans.component';
import { PanelBaseComponent } from './panels/panel-base/panel-base.component';

import { CardBaseComponent } from './cards/card-base/card-base.component';
import { CardRecipeIngredientsComponent } from './cards/card-recipe-ingredients/card-recipe-ingredients.component';
import { CardGroceriesComponent } from './cards/card-groceries/card-groceries.component';
import { CardExpensesComponent } from './cards/card-expenses/card-expenses.component';
import { CardBooksComponent } from './cards/card-books/card-books.component';
import { CardRecipesComponent } from './cards/card-recipes/card-recipes.component';
import { CardGroceryListComponent } from './cards/card-grocery-list/card-grocery-list.component';
import { CardGroceryEditComponent } from './cards/card-grocery-edit/card-grocery-edit.component';

import { GroceryFormComponent } from './forms/grocery/grocery-form.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        Ng2CompleterModule,
        BudgetRoutingModule,
        SharedModule,
        AuthModule
    ],
    declarations: [
        BudgetDashboardComponent,
        PanelSummaryComponent,
        HeaderComponent,
        UserNavComponent,
        UserProfileComponent,
        PanelCategoriesComponent,
        PanelTransactionsComponent,
        PanelExpensesComponent,
        PanelBooksComponent,
        YearNavComponent,
        PanelNavComponent,
        UserProfileTransformPipe,
        CategoriesTransformPipe,
        FilterControlsComponent,
        PanelChartComponent,
        PanelSummaryChartComponent,
        PanelSpendingChartComponent,
        PanelGroceryControlsComponent,
        PanelGroceryCartComponent,
        GroceryFormComponent,
        PanelGroceriesComponent,
        PanelFoodProductsComponent,
        PanelRecipesComponent,
        PanelMealPlansComponent,
        PanelBaseComponent,

        CardBaseComponent,
        CardRecipeIngredientsComponent,
        CardExpensesComponent,
        CardBooksComponent,
        CardRecipesComponent,
        CardGroceryListComponent,
        CardGroceryEditComponent,
        CardGroceriesComponent
    ],
    providers: [
        CoreService,
        FinanceService,
        FoodService,
        PersonalService,
        PanelChartService,
        NavigationService,
        DatePipe
    ]
})
export class BudgetModule { }
