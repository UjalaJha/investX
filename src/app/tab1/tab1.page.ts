import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private router: Router){}

  viewInvestment(investment_name){
		this.router.navigate(['/view-investment/'+investment_name])
	}
	addInvestment(investment_name){
		this.router.navigate(['/add-investment/'+investment_name])
	}
}
