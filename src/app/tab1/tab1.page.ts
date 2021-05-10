import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from './../services/db.service';
import { InvestmentOverview } from '../services/investment-overview';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
	data: InvestmentOverview[]=[];
	mapAmount = new Map();
  mapNum = new Map();
  constructor(private db: DbService,private router: Router){
  }

  ngOnInit(){
  	this.db.dbState().subscribe((res) => {
      console.log("In Tab1Page dbState : ",res);
	    if(res){
	      this.db.fetchInvestmentsDetails().subscribe(item => {
          console.log("In getInvestmentsDetails : ",item);
          this.mapNum.clear();
          this.mapAmount.clear();
          for (var i = 0; i < item.length; i++) {  
          		console.log("Item Single:",item[0].investment_name);
          		this.mapAmount.set(item[0].investment_name,item[0].investment_amount);
							this.mapNum.set(item[0].investment_name,item[0].investment_num);
	      	}
	      });
	    }
	  });
  }
  viewInvestment(investment_name){
		this.router.navigate(['/view-investment/'+investment_name])
	}
	addInvestment(investment_name){
		this.router.navigate(['/add-investment/'+investment_name])
	}
}
