import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { DbService } from './../services/db.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
	mapTax=new Map();
	defaultYear:any;
	constructor(private db: DbService){
		this.defaultYear="22";
  }

  ionViewDidEnter(){
  	this.onChange("Loading Tax for : "+this.defaultYear)
  }

  onChange(year){
		console.log(year)
		this.mapTax=new Map();
		this.db.getTaxPF(year).then(res=> {
    		this.mapTax.set(res[0].investment_name,res[0].investment_amount);
    });
    this.db.getTaxElss(year).then(res=> {
    		this.mapTax.set(res[0].investment_name,res[0].investment_amount);
    });
    this.db.getTaxSSY(year).then(res=> {
    		this.mapTax.set(res[0].investment_name,res[0].investment_amount);
    });
    this.db.getTaxInsurance(year).then(res=> {
    		this.mapTax.set('ip',res[0].investment_amount);
    });
    this.db.getTaxFD(year).then(res=> {
    		this.mapTax.set(res[0].investment_name,res[0].investment_amount);
    });
	}

}
