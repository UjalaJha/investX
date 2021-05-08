import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from './../services/db.service';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-add-investment',
  templateUrl: './add-investment.page.html',
  styleUrls: ['./add-investment.page.scss'],
})
export class AddInvestmentPage implements OnInit {
	investment_name:any;
	mainForm: FormGroup;
  Data: any[] = []

  constructor(
  	private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private actRoute: ActivatedRoute,
    private router: Router) 
	  { 
	    this.investment_name = this.actRoute.snapshot.paramMap.get('investment_name');
	    console.log("Investment Name :"+this.investment_name);
	  } 

  ngOnInit() {
  	this.mainForm = this.formBuilder.group({
      id: [''],
      investment_name: [''],
      investment_title: [''],
      investment_amount: [''],
	    investment_type: [''],
	    investment_app: [''],
	    investment_started_on: [''],
	    investment_maturing_on: [''],
	    investment_interest_rate : [''],
	    investment_more_info : ['']
    })
  }

  // investment_name='PF';
  storeData() {
    	this.db.addInvestment(
      this.investment_name,
      this.mainForm.value.investment_title,
      this.mainForm.value.investment_amount,
	    this.mainForm.value.investment_type,
	    this.mainForm.value.investment_app,
	    this.mainForm.value.investment_started_on,
	    this.mainForm.value.investment_maturing_on,
	    this.mainForm.value.investment_interest_rate,
	    this.mainForm.value.investment_more_info
    ).then(async(res) => {
    	console.log("In Store Data",res);
      this.mainForm.reset();
      let toast = await this.toast.create({
        message: 'Investment Added',
        duration: 2500
      });
      toast.present(); 
    })
  }

}
