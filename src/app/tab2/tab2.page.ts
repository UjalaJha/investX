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
	mapAmount = new Map();
  mapNum = new Map();
  

	@ViewChild("pieCanvas",{static:true}) pieCanvas: ElementRef;
	private pieChart: Chart;

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
  ionViewDidEnter(){
  	let ctx = this.pieCanvas.nativeElement;
		ctx.height = 400;


  	var chartColors = {
		  red: 'rgb(255, 99, 132)',
		  blue: 'rgb(54, 162, 235)'
		};

		var myChart = new Chart(ctx, {
		  type: 'pie',
		  data: {
		    labels: ["Label 1", "Label 2"],
		    datasets: [{
		      backgroundColor: [chartColors.red, chartColors.blue],
		      data: [4, 7],
		      hoverBorderWidth: 5,
		      borderColor: 'transparent',
		    }]
		  },
		  options: {
		    title: {
		      display: true,
		      text: 'Investment in Various Portfolios',
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
		  },
		  plugins: [{
		    beforeInit: function(chart, options) {
		      console.log('yolo');
		    }
		  }]
		});

  }

}
