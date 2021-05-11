import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { DbService } from './../services/db.service';
import { InvestmentOverview } from '../services/investment-overview';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
	data: InvestmentOverview[]=[];
	dataAmount = [];
  dataNum = [];
  dataName=[];
  dataColour=[];
  

	@ViewChild("pieCanvas",{static:true}) pieCanvas: ElementRef;
	private pieChart: Chart;

	@ViewChild("pieCanvas2",{static:true}) pieCanvas2: ElementRef;
	private pieChart2: Chart;

	constructor(private db: DbService,private router: Router){
  }

  ngOnInit(){
  	this.db.dbState().subscribe((res) => {
      console.log("In Tab1Page dbState : ",res);
	    if(res){
	      this.db.fetchInvestmentsDetails().subscribe(item => {
          console.log("In getInvestmentsDetails : ",item);
          var chartColors = {
					  pf: 'rgb(255, 168, 96)',
					  mf: 'rgb(168, 216, 168)',
					  bkd: 'rgb(96, 192, 168)',
						cc: 'rgb(48, 144, 192)',
						ss: 'rgb(240, 240, 168)',
						cd: 'rgb(240, 120, 72)',
						bd: 'rgb(192, 216, 144)',
						lic: 'rgb(144, 192, 216)',
						ins: 'rgb(240, 168, 144)',
						etf: 'rgb(240, 216, 168)',
						ret: 'rgb(192, 168, 192)',
						chf: 'rgb(0, 72, 96)',
						gvt: 'rgb(72, 168, 168)',
						oth: 'rgb(216, 216, 192)',
					};
					this.dataAmount = [];
				  this.dataNum = [];
				  this.dataName=[];
				  this.dataColour=[];
          for (var i = 0; i < item.length; i++) {  
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
  ionViewDidEnter(){
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
		      text: 'Investment By Amount',
		      fontStyle: 'bold',
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
		          return data.labels[tooltipItem.datasetIndex] + " : " +numberWithCommas(value);
		        }
		      }
		    }
		  },
		  plugins: [{
		    beforeInit: function(chart, options) {
		     
		    }
		  }]
		});

		let ctx2 = this.pieCanvas2.nativeElement;
		var myChart2 = new Chart(ctx2, {
		  type: 'pie',
		  data: {
		    labels: this.dataName,
		    datasets: [{
		      backgroundColor: this.dataColour,
		      data: this.dataNum,
		    }]
		  },
		  options: {
		    title: {
		      display: true,
		      text: 'Investment By Number of Transaction',
		      fontStyle: 'bold',
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
		          return data.labels[tooltipItem.datasetIndex] + " : " +numberWithCommas(value);
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
