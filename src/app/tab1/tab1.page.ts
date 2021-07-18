import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { DbService } from './../services/db.service';
import { InvestmentOverview } from '../services/investment-overview';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ReturnsModalPage } from '../modals/returns-modal/returns-modal.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
	data: InvestmentOverview[]=[];
	mapAmount = new Map();
  mapNum = new Map();
  mapAbsReturn = new Map();
  home: string = "portfolio";
  dataReturned: any;
  dataAmount = [];
  dataNum = [];
  dataName=[];
  dataColour=[];
  

  @ViewChild("pieCanvas",{static:false}) pieCanvas: ElementRef;
  
  @ViewChild("pieCanvas2",{static:false}) pieCanvas2: ElementRef;

  private pieChart: Chart;

  constructor(private db: DbService,private router: Router,public modalController: ModalController){
  }

  ngOnInit(){

  	this.db.dbState().subscribe((res) => {
      console.log("In Tab1Page dbState : ",res);
	    if(res){

        this.db.addAbsReturns("ProvidentFund",5);
        this.db.addAbsReturns("BankDeposit",5);
        this.db.addAbsReturns("MutualFund",5);
        this.db.addAbsReturns("Crypto",5);
        this.db.addAbsReturns("SharesAndStocks",5);
        this.db.addAbsReturns("Bonds",5);
        this.db.addAbsReturns("Commodity",5);
        this.db.addAbsReturns("LIC",5);
        this.db.addAbsReturns("InsurancePlans",5);
        this.db.addAbsReturns("RetirementFund",5);
        this.db.addAbsReturns("ChildFutures",5);
        this.db.addAbsReturns("GovernmentFund",5);
        this.db.addAbsReturns("ETF",5);
        this.db.addAbsReturns("Others",5);

        // this.db.addInvestment("ProvidentFund","PPF for April 2021",2500,"ppf","","2021-04-01","",7,"");
        // this.db.addInvestment("ProvidentFund","PPF for May 2021",2500,"ppf","","2021-05-01","",7,"");
        // this.db.addInvestment("ProvidentFund","PPF for June 2021",2500,"ppf","","2021-06-01","",7,"");
        // this.db.addInvestment("ProvidentFund","PPF for July 2021",2500,"ppf","","2021-07-01","",7,"");
        // this.db.addInvestment("MutualFund","ELSS for April 2021",10000,"elss","","2021-04-01","",7,"");
        // this.db.addInvestment("MutualFund","ELSS for June 2021",10000,"elss","","2021-06-01","",7,"");
        // this.db.addInvestment("MutualFund","ELSS for July 2021",10000,"elss","","2021-07-01","",7,"");
        // this.db.addInvestment("MutualFund","Equity for April 2021",10000,"equity","","2021-04-01","",7,"");
        // this.db.addInvestment("MutualFund","Equity for June 2021",10000,"equity","","2021-06-01","",7,"");
        // this.db.addInvestment("MutualFund","Equity for July 2021",10000,"equity","","2021-07-01","",7,"");
        // this.db.addInvestment("BankDeposit","FD 1.0",10000,"fixeddeposit","","2021-03-15","",5,"");
        // this.db.addInvestment("BankDeposit","FD 2.0",10000,"taxsavingfd","","2021-04-01","",5,"");
        // this.db.addInvestment("BankDeposit","FD 3.0",10000,"fixeddeposit","","2021-04-30","",5,"");

	      this.db.fetchInvestmentsDetails().subscribe(item => {
          console.log("In getInvestmentsDetails Subscriber: ",item);
          var chartColors = {
            ProvidentFund: 'rgb(255, 168, 96)',
            MutualFund: 'rgb(168, 216, 168)',
            BankDeposit: 'rgb(96, 192, 168)',
            Crypto: 'rgb(48, 144, 192)',
            SharesAndStocks: 'rgb(240, 240, 168)',
            Commodity: 'rgb(240, 120, 72)',
            Bonds: 'rgb(192, 216, 144)',
            LIC: 'rgb(144, 192, 216)',
            InsurancePlans: 'rgb(240, 168, 144)',
            ETF: 'rgb(240, 216, 168)',
            RetirementFund: 'rgb(192, 168, 192)',
            ChildFutures: 'rgb(0, 72, 96)',
            GovernmentFund: 'rgb(72, 168, 168)',
            Others: 'rgb(216, 216, 192)',
          };
          this.mapNum.clear();
          this.mapAmount.clear();
          this.dataAmount = [];
          this.dataNum = [];
          this.dataName=[];
          this.dataColour=[];
          for (var i = 0; i < item.length; i++) {  
          		this.mapAmount.set(item[i].investment_name,item[i].investment_amount);
							this.mapNum.set(item[i].investment_name,item[i].investment_num);
              this.mapAbsReturn.set(item[i].investment_name,item[i].investment_abs_return);
              this.dataName.push(item[i].investment_name);
              this.dataAmount.push(item[i].investment_amount);
              this.dataNum.push(item[i].investment_num);
              var colour=item[i].investment_name;
              this.dataColour.push(chartColors[colour]);
	      	}

	      });
	    }
	  });
  }
  clickEdit(){
    this.router.navigate(['/change-return'])
  }
  setEditable(item) {
    item.editable = true;
  }
  viewInvestment(investment_name){
		this.router.navigate(['/view-investment/'+investment_name])
	}

	addInvestment(investment_name){
		this.router.navigate(['/add-investment/'+investment_name])
	}

  async openModal() {
    const modal = await this.modalController.create({
      component: ReturnsModalPage,
      componentProps: {
        "mapAbsReturn": this.mapAbsReturn
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }

  onSegmentChange(ev: any) {
    console.log('Segment changed', ev.detail.value);
    if(ev.detail.value=="insight"){
      setTimeout(()=>{
        console.log("Segment change");
        const numberWithCommas = x => {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          // return Number(x).toLocaleString();
        };
        let ctx = this.pieCanvas.nativeElement;
        var myChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: this.dataName,
            datasets: [{
              backgroundColor: this.dataColour,
              data: this.dataAmount,
            }]
          },
          options: {
            title: {
              display: true,
              text: 'Your Portfolio',
              fontStyle: 'bold',
              fontFamily : "Montserrat",
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'bottom',
              fullWidth: false,
              onClick: () => {},
              labels: {
               
              }
            },
            rotation: 3.9,
            tooltips: {
              callbacks: {
                 label: (tooltipItem, data) => {
                  const value =
                  data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                  return data.labels[tooltipItem.index] + " : " +numberWithCommas(value);
                }
              }
            }
          },
          plugins: [{
            beforeInit: function(chart, options) {
             
            }
          }]
        });


      },0);

    }
  }

}
