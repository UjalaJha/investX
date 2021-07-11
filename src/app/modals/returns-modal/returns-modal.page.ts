import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormControl, Validators } from "@angular/forms";
import { ModalController, NavParams } from '@ionic/angular';
import { ActivatedRoute, Router } from "@angular/router";
import { DbService } from '../../services/db.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-returns-modal',
  templateUrl: './returns-modal.page.html',
  styleUrls: ['./returns-modal.page.scss'],
})
export class ReturnsModalPage implements OnInit {

  mapAbsReturn = new Map();
	mainForm: FormGroup;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private router: Router,
  	private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
  ) { }

  ngOnInit() {
    console.table(this.navParams);
    this.mapAbsReturn = this.navParams.data.mapAbsReturn;
    this.mainForm = this.formBuilder.group({
      ProvidentFund: new FormControl(''),
      MutualFund: new FormControl(''),
      BankDeposit: new FormControl('')
	  
    });
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

  storeReturns(){
	this.db.updateAbsReturns(
	    "ProvidentFund",7.5
  	).then(async(res) => {
	  	console.log("In Store Data",res);
	    this.mainForm.reset();
	    let toast = await this.toast.create({
	      message: 'Returns Updated',
	      duration: 2500
	    });
	      toast.present(); 
    })
	this.db.getAbsReturns().then(async(res) => {
	  	console.log("In Get Data",res);
	   
    })
  }

}
