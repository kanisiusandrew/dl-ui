import {inject, bindable, BindingEngine, observable, computedFrom} from 'aurelia-framework'
var moment = require('moment');

@inject(BindingEngine, Element)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};

    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;
    }

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }

    attached() {

        // this.bindingEngine.propertyObserver(this.data, "buyer").subscribe((newValue, oldValue) => {
        //     this.data.buyer = newValue;
        //     this.data.buyerId = newValue._id;
        // });

        // this.bindingEngine.propertyObserver(this.data, "RefPONo").subscribe((newValue, oldValue) => {
        //     if (!this.data.isSplit) {
        //         this.data.PRNo = newValue;
        //     }
        // });

        if (this.data.isSplit) {
            this.splitPO();
        }
    }

    splitPO() {
        for (var item of this.data.items) {
            item.isSplit = this.data.isSplit;
        }
    }

    addItem() {
        console.log(this.data);
    }

    removeItem(item) {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }
} 