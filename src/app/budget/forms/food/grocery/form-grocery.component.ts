import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompleterService, CompleterData, CompleterCmp } from 'ng2-completer';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { FoodProduct, Grocery, Supermarket, } from '../../../models/food';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { FormBaseComponent } from '../../core/base/form-base.component';

@Component({
    selector: 'budget-form-grocery',
    templateUrl: './form-grocery.component.html',
    styleUrls: ['./form-grocery.component.scss']
})
export class FormGroceryComponent extends FormBaseComponent implements OnInit {

    @Input() grocery: Grocery;
    @Input() user: string;

    model: Grocery = new Grocery(0, null, null, null);
    foodProducts: Observable<FoodProduct[]>;
    supermarkets: Observable<Supermarket[]>;
    foodProductsService: CompleterData;
    supermarketsService: CompleterData;
    latestGrocery: boolean = false;
    @ViewChild("foodProduct") _foodProduct: CompleterCmp;

    constructor(
        public route: ActivatedRoute,
        public apiService: FoodService,
        public completerService: CompleterService
    ) {
        super(route)
    }

    ngOnInit() {
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
        this.latestGrocery = false;
    }

    onProductSelect() {
        if (this.model.name) {
            this.apiService.getLatestGrocery(this.model.name, this.model.supermarket).subscribe(grocery => {
                this.latestGrocery = grocery ? true : false;
                if (grocery) {
                    this.model.weight = grocery.weight;
                    this.model.count = grocery.count;
                    this.model.amount = grocery.amount;
                    this.model.organic = grocery.organic;
                    this.model.seasonal = grocery.seasonal;
                    this.model.unit = grocery.unit;
                    this.model.quantityType = grocery.quantityType;
                }
                else {
                    this.model.weight = 0;
                    this.model.count = 0;
                    this.model.amount = 0;
                    this.model.organic = null;
                    this.model.seasonal = 'No';
                    this.model.unit = 'lb';
                    this.model.quantityType = 'None';

                }
            });
        }
    }

    beforeSubmit() {
        this.model.user = this.model.user ? this.model.user : this.user;
        this.model.weight = this.model.weight ? this.model.weight : 0;
        this.model.count = this.model.count ? this.model.count : 0;
        this.model.amount = this.model.amount ? this.model.amount : 0;
    }

}

