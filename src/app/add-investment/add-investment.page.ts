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
  data: any;
  investment_full_name:string;

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
  	let map = new Map();
		switch (this.investment_name) {
		    case 'pf':
		   			map.set("ppf","PPF");
						map.set("epf","EPF");
						map.set("vpf","VPF");
						this.data=map;
						this.investment_full_name="Provident Fund";
		   			console.log("Data of Type : ",this.data);
		        break;
		    case 'mf':
						map.set("liquid","Liquid");
						map.set("debt","Debt");
						map.set("equity","Equity");
						map.set("hybrid","Hybrid");
						map.set("solutionoriented","SolutionOriented");
						this.data=map;
						this.investment_full_name="Mutual Fund";
		   			console.log("Data of Type : ",this.data);
		        break;
		    case 'bkd':
		        map.set("fixeddeposit","FixedDeposit");
						map.set("recurringdeposit","RecurringDeposit");
						this.investment_full_name="Bank Deposit";
						this.data=map;
		        break;
		    case 'cc':
		        map.set("bitcoin","Bitcoin");
						map.set("ether","Ether");
						map.set("dogecoin","Dogecoin");
						map.set("others","Others");
						this.data=map;
						this.investment_full_name="CryptoCurrency";
		        break;
		    case 'ss':
		    		map.set("usstock","USStock");
		    		map.set("indiastock","IndiaStock");
		    		this.data=map;
		    		this.investment_full_name="Stocks and Shares";
		        console.log("It is a Thursday.");
		        break;
		    case 'cd':
		        this.data=null;
		        this.investment_full_name="Commodity"
		        break;
		    case 'bd':
		        this.data=null;
		        this.investment_full_name="Bonds"
		        break;
	     	case 'lic':
		        this.data=null;
		        this.investment_full_name="LIC"
		        break;
	      case 'ins':
		        this.data=null;
		        this.investment_full_name="Insurance";
		        break;
	      case 'etf':
	        	this.data=null;
	        	this.investment_full_name="ETF";
		        break;
	      case 'ret':
	      		this.investment_full_name="Retirement Fund"
	        	this.data=null;
		        break;
	      case 'chf':
	      		this.investment_full_name="Child Futures"
	        	this.data=null;
		        break;
	      case 'gvt':
	      		this.investment_full_name="Government Funds"
	        	this.data=null;
		        break;
	      case 'oth':
	      		this.investment_full_name="Other";
	        	this.data=null;
		        break;	
		    default:
		        this.data=null;
		        break;
		}
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
