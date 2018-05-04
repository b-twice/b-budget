import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'budget-form-base',
    template: '<div></div>'
})
export class FormBaseComponent {

    @Input() submitLabel: string = 'Submit';
    model: {} = {};
    user: string;
    year: string;
    @Output() onSubmit = new EventEmitter<any>();
    @Output() onDelete = new EventEmitter<any>();


    constructor(
        public route: ActivatedRoute
    ) {
    }
    resolveRoutes() {
        this.route.params.subscribe(
            params => {
                this.user = params['user'];
                this.year = params['year'];
            }
        );
    }

    beforeSubmit() { }

    submit() {
        this.beforeSubmit();
        this.onSubmit.emit(this.model);
    }

    delete() {
        this.onDelete.emit(this.model);
    }

}

