import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { DbService } from './../services/db.service';
import { InvestmentOverview } from '../services/investment-overview';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

	investment_amount:number;
	investment_freq:string;
	investment_roi:number;
	investment_period:number;
	inflation:string="no";
	result:any;
	expected_amount:number;
	amount_invested:number;
	profit_earned:number;

	@ViewChild("pieCanvas",{static:true}) pieCanvas: ElementRef;
	private pieChart: Chart;

	@ViewChild(IonContent, {static: true}) content: IonContent;


  constructor() {}

	ngOnInit() {
	  
	}

	scrollToBottomOnInit() {
	  this.content.scrollToBottom(300);
	}

  loadResult() {
		this.result = this.calculateSIP();
		this.expected_amount = this.result.expected_amount;
		this.amount_invested =  this.result.amount_invested;
		this.profit_earned = this.result.profit_earned;
		console.log(this.result);
		this.scrollToBottomOnInit();
		this.createGraph();
  }

  calculateSIP() {
		var SIP = 0;
		var result = {
			expected_amount: 0,
			amount_invested: 0,
			profit_earned: 0
		};
		let var1 = this.investment_amount;
		let var2 = this.investment_period;
		let var3 = this.investment_roi;
		let var4 = parseInt(this.inflation);
		console.log(var1,var2,var3,var4);

		if (this.inflation == "no") {
			if (this.investment_freq == "mon") {

				SIP = (var1 * (((1 + ((var3 / 100) / 12)) ** (var2 * 12)) - 1) * (1 + ((var3 / 100) / 12))) / ((var3 / 100) / 12);
				result.expected_amount = Math.round(SIP);
				result.amount_invested = Math.round(var1 * var2 * 12);
				result.profit_earned = Math.round(SIP - (var1 * var2 * 12));
			}
			if (this.investment_freq == "week") {
				SIP = ((var1 * 4) * (((1 + ((var3 / 100) / 12)) ** (var2 * 12)) - 1) * (1 + ((var3 / 100) / 12))) / ((var3 / 100) / 12);
				result.expected_amount = Math.round(SIP);
				result.amount_invested = Math.round((var1 * 4) * (var2 * 12));
				result.profit_earned = Math.round(SIP - ((var1 * 4) * (var2 * 12)));
			}
			if (this.investment_freq == "quat") {
				SIP = ((var1 / 4) * (((1 + ((var3 / 100) / 12)) ** (var2 * 12)) - 1) * (1 + ((var3 / 100) / 12))) / ((var3 / 100) / 12);
				result.expected_amount = Math.round(SIP);
				result.amount_invested = Math.round((var1 / 4) * (var2 * 12));
				result.profit_earned = Math.round(SIP - ((var1 / 4) * (var2 * 12)));
			}
		}
		if (this.inflation != "no") {
			if (this.investment_freq == "mon") {

				SIP = (var1 * (((1 + (((var3 - var4) / 100) / 12)) ** (var2 * 12)) - 1) * (1 + (((var3 - var4) / 100) / 12))) / (((var3 - var4) / 100) / 12);
				result.expected_amount = Math.round(SIP);
				result.amount_invested = Math.round((var1 * var2 * 12));
				result.profit_earned = Math.round(SIP - ((var1 * var2 * 12)));

			}
			if (this.investment_freq == "week") {

				SIP = ((var1 * 4) * (((1 + (((var3 - var4) / 100) / 12)) ** (var2 * 12)) - 1) * (1 + (((var3 - var4) / 100) / 12))) / (((var3 - var4) / 100) / 12);
				result.expected_amount = Math.round(SIP);
				result.amount_invested = Math.round((var1 * var2 * 12 * 4));
				result.profit_earned = Math.round(SIP - ((var1 * var2 * 12 * 4)));

			}
			if (this.investment_freq == "quat") {
				SIP = ((var1 / 4) * (((1 + (((var3 - var4) / 100) / 12)) ** (var2 * 12)) - 1) * (1 + (((var3 - var4) / 100) / 12))) / (((var3 - var4) / 100) / 12)
				result.expected_amount = Math.round(SIP);
				result.amount_invested = Math.round((var1 / 4) * (var2 * 12));
				result.profit_earned = Math.round(SIP - ((var1 / 4) * (var2 * 12)));

			}
		}
		return result;
	}
	createGraph(){
		const numberWithCommas = x => {
		  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		  // return Number(x).toLocaleString();
		};
  	let ctx = this.pieCanvas.nativeElement;
		var myChart = new Chart(ctx, {
		  type: 'bar',
		  data: {
		    labels:  ['Amount in Rs'],
		    datasets: [{
		    	label: 'Invested Amount',
		      data: [this.result.amount_invested],
          backgroundColor: '#F2AF29',
		    },
		    {
          label: 'Profit Earned',
          data: [this.result.profit_earned],
          backgroundColor: '#45CB85',
        }
        ]
		  },
		  options: {
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        },
        tooltips: {
				  callbacks: {
						label: function(tooltipItem, data) {
							let value =
		          data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
							let op = value.toString();
							let op2 = op.split(/(?=(?:...)*$)/);
							let op3 = op2.join(',');
							return op3;
						}
				  } 
				}
      },
		  plugins: [{
		    beforeInit: function(chart, options) {
		     
		    }
		  }]
		});
	}

}
