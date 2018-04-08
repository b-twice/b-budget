import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompleterService, CompleterData } from 'ng2-completer';
import { ActivatedRoute } from '@angular/router';
import { BudgetService } from '../../services/budget.service';
import { FoodProduct, UserGrocery, Supermarket } from '../../models';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'budget-grocery-form',
    templateUrl: './grocery-form.component.html',
    styleUrls: ['./grocery-form.component.scss']
})
export class GroceryFormComponent implements OnInit {

    @Input() submitLabel: string = 'Submit';
    foodProducts: Observable<FoodProduct[]>;
    supermarkets: Observable<Supermarket[]>;
    user: string;
    year: string;
    foodProductsService: CompleterData;
    supermarketsService: CompleterData;
    model: UserGrocery = new UserGrocery(0, null, null, null);
    @Output() onSubmit = new EventEmitter<UserGrocery>();

    constructor(
        public route: ActivatedRoute,
        public budgetService: BudgetService,
        public completerService: CompleterService,
    ) {
    }

    ngOnInit() {
        this.route.parent.params.subscribe(
            params => {
                this.user = params['user'];
                this.year = params['year'];
            }
        )
        this.foodProducts = this.budgetService.getFoodProducts();
        this.supermarkets = this.budgetService.getSupermarkets();
        this.foodProductsService = this.completerService.local(this.foodProducts, 'name', 'name');
        this.supermarketsService = this.completerService.local(this.supermarkets, 'name', 'name');
    }

    rebuild() {
        this.model = new UserGrocery(0, this.user, this.model.supermarket, null, this.model.date);
    }

    onProductSelect() {
        if (this.model.name) {
            this.budgetService.getLatestGrocery(this.model.name, this.model.supermarket).subscribe(grocery => {
                if (grocery) {
                    this.model.weight = grocery.weight;
                    this.model.count = grocery.count;
                    this.model.amount = grocery.amount;
                    this.model.organic = grocery.organic;
                    this.model.seasonal = grocery.seasonal;
                }
            });
        }
    }

    submit() {
        this.model.user = this.user;
        this.model.weight = this.model.weight ? this.model.weight : 0;
        this.model.count = this.model.count ? this.model.count : 0;
        this.model.amount = this.model.amount ? this.model.amount : 0;

        this.onSubmit.emit(this.model);
    }

}

