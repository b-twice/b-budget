import { NgModule } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { HttpModule, Http, RequestOptions } from '@angular/http';

import { BudgetRoutingModule } from './routing/budget-routing.module';

import { BudgetService } from './services/budget.service';

//shared
import { SharedModule } from '../shared/shared.module';

import { BudgetDashboardComponent } from './dashboard.component';
import { HeaderComponent } from './header/header.component';
import { PanelSummaryComponent } from './panel-summary/summary.component';
import { PanelCategoriesComponent } from './panel-categories/categories.component';
import { PanelTransactionsComponent } from './panel-transactions/transactions.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { YearNavComponent } from './year-nav/year-nav.component';
import { PanelNavComponent } from './panel-nav/panel-nav.component';
import { PanelComponent } from './panel/panel.component';
import { AuthModule } from './services/auth.module';

import { SummaryTransformPipe } from './panel-summary/summary-transform.pipe';
import { UserProfileTransformPipe } from './user-profile/user-profile-transform.pipe';
import { CategoriesTransformPipe } from './panel-categories/categories-transform.pipe';
import { FilterControlsComponent } from './filter-controls/filter-controls.component';
import { PanelChartComponent } from './panel-chart/panel-chart.component';
import { PanelChartService } from './panel-chart/panel-chart.service';
import { PanelGroceriesComponent } from './panel-groceries/groceries.component';
import { PanelFoodProductsComponent } from './panel-food-products/food-products.component';
import { PanelRecipesComponent } from './panel-recipes/panel-recipes.component';
import { CardRecipeIngredientsComponent } from './card-recipe-ingredients/card-recipe-ingredients.component';
import { CardGroceriesComponent } from './card-groceries/card-groceries.component';

@NgModule({
    imports: [
        CommonModule,
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
        YearNavComponent,
        PanelNavComponent,
        PanelComponent,
        SummaryTransformPipe,
        UserProfileTransformPipe,
        CategoriesTransformPipe,
        FilterControlsComponent,
        PanelChartComponent,
        PanelGroceriesComponent,
        PanelFoodProductsComponent,
        PanelRecipesComponent,
        CardRecipeIngredientsComponent,
        CardGroceriesComponent
    ],
    providers: [
        BudgetService,
        PanelChartService,
        DatePipe
    ]
})
export class BudgetModule { }
