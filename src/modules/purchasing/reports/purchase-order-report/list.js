import {inject} from 'aurelia-framework'; 
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    constructor(router, service) {
        
        this.service = service;
        this.router = router; 
        this.today = new Date();
    } 


    activate() {
        
    }

    searching(){
        var pricetotals=0;
        var percentage=[];
        var percentagetotal=0;
        var persen=0;
        var data=[];
        this.service.getByDate(this.dateFrom,this.dateTo)
            .then(data => {
                this.data = data;
                for( var price of data) { 
                    pricetotals += price.pricetotal;
                }
                this.pricetotals=pricetotals;
                for( var item of data) { 
                    if(item.pricetotal!=0 && this.pricetotals!=0)
                    {
                        this.persen= ((item.pricetotal*100)/this.pricetotals).toFixed(2);
                    }
                    else
                    {
                        this.persen=0;
                    }
                    percentage.push(this.persen);
                    
                }
                for (var p of percentage)
                {
                    percentagetotal+=parseFloat(p);
                }
                this.percentage=percentage;
                this.percentagetotal=(percentagetotal).toFixed(2);
            })
            
    }

}