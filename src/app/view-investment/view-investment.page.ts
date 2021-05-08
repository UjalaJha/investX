import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from './../services/db.service';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-investment',
  templateUrl: './view-investment.page.html',
  styleUrls: ['./view-investment.page.scss'],
})
export class ViewInvestmentPage implements OnInit {
  investment_name:any;
  constructor(
  	private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private actRoute: ActivatedRoute,
    private router: Router) 
  { 
    this.investment_name = this.actRoute.snapshot.paramMap.get('investment_name');
    console.log("Investment Name : "+this.investment_name);
  }  

  data: any;
  investmentSubscription: Subscription;
  ngOnInit() {
  	this.db.dbState().subscribe((res) => {
      console.log("In ViewInvestmentPage dbState : ",res);
      console.log("investment_name : ",this.investment_name);
	    if(res){
	      this.investmentSubscription = this.db.fetchInvestments(this.investment_name).subscribe(item => {
          console.log("In NgInit of ViewInvestmentPage : ",item);
	        this.data = item;
	      })
	    }
	  });
  }
  deleteInvestment(id,investment_name){
    this.db.deleteInvestment(id,investment_name).then(async(res) => {
      let toast = await this.toast.create({
        message: 'Investment deleted',
        duration: 2500
      });
      toast.present();      
    })
  }
  ngOnDestroy() { 
    this.investmentSubscription.unsubscribe();
  }

}
