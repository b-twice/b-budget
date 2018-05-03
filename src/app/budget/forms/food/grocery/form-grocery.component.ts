import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompleterService, CompleterData, CompleterCmp } from 'ng2-completer';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { FoodProduct, Grocery, Supermarket, } from '../../../models/food';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
    selector: 'budget-grocery-form',
    templateUrl: './form-grocery.component.html',
    styleUrls: ['./form-grocery.component.scss']
})
export class FormGroceryComponent implements OnInit {

    @Input() grocery: Grocery;
    @Input() submitLabel: string = 'Submit';

    model: Grocery = new Grocery(0, null, null, null);
    foodProducts: Observable<FoodProduct[]>;
    supermarkets: Observable<Supermarket[]>;
    user: string;
    year: string;
    foodProductsService: CompleterData;
    supermarketsService: CompleterData;
    @Output() onSubmit = new EventEmitter<Grocery>();
    @Output() onDelete = new EventEmitter<Grocery>();

    @ViewChild("foodProduct") _foodProduct: CompleterCmp;

    constructor(
        public route: ActivatedRoute,
        public apiService: FoodService,
        public completerService: CompleterService
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                this.user = params['user'];
                this.year = params['year'];
            }
        );
        forkJoin(
            this.apiService.getFoodProducts(),
            this.apiService.getSupermarkets()
        ).subscribe(data => {
            this.foodProductsService = this.completerService.local(data[0], 'name', 'name');
            this.supermarketsService = this.completerService.local(data[1], 'name', 'name');
            if (this.grocery) {
                this.model = this.grocery
            }
        })
    }

    rebuild() {
        this.model = new Grocery(0, this.user, this.model.supermarket, null, this.model.date);
        this._foodProduct.focus();
    }

    onProductSelect() {
        if (this.model.name) {
            this.apiService.getLatestGrocery(this.model.name, this.model.supermarket).subscribe(grocery => {
                if (grocery) {
                    this.model.weight = grocery.weight;
                    this.model.count = grocery.count;
                    this.model.amount = grocery.amount;
                    this.model.organic = grocery.organic;
                    this.model.seasonal = grocery.seasonal;
                    this.model.unit = grocery.unit;
                }
            });
        }
    }

    submit() {
        this.model.user = this.model.user ? this.model.user : this.user;
        this.model.weight = this.model.weight ? this.model.weight : 0;
        this.model.count = this.model.count ? this.model.count : 0;
        this.model.amount = this.model.amount ? this.model.amount : 0;
        this.onSubmit.emit(this.model);
    }

    delete() {
        this.onDelete.emit(this.model);

    }

}

