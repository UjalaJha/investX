import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
	mapTax=new Map();
	defaultVal:any;
  defaultSelect: any;
	constructor(private router: Router,public alertController: AlertController){
		this.defaultVal="5";
    this.defaultSelect="0";
  }
  async optionViewClick() {
    
    const alert = await this.alertController.create({
       header: 'Transactions',
       message: '25-Apr - 1000 - U8999867 <ion-icon name="eye-outline"></ion-icon> <br> 20-Apr - 3000 - U8970899 <ion-icon name="eye-outline"></ion-icon> <br> 15-Apr - 2000 - U8999867 <ion-icon name="eye-outline"></ion-icon>',
       buttons: ['OK'],
     });
 
     await alert.present();
   }

  async optionClick() {
    
   const alert = await this.alertController.create({
      header: 'Default Investment Plan',
      message: 'AMC Hybrid balanced Fund Plan',
      buttons: [{  
        text: 'Change',  
        role: 'change',  
        handler: () => {  
          this.change();
          console.log('Confirm Cancel');  
        }  
      },  
      {  
        text: 'Okay',  
        handler: () => {  
          console.log('Confirm Okay.');  
        }  
      }  ],
    });

    await alert.present();
  }


  change(){
    this.router.navigate(['/tabs/tab3']);
  }

  async optionOldClick() {
    
    const alert = await this.alertController.create({
       header: 'Invested Fund : ',
       message: 'AMC Hybrid balanced Fund Plan',
       buttons: ['Details', 'OK'],
     });
 
     await alert.present();
   }
}
