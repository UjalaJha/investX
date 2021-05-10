import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

	@ViewChild("pieCanvas",{static:true}) pieCanvas: ElementRef;
	private pieChart: Chart;

  constructor( ) {
  	
  }

  ionViewDidEnter(){
  	let ctx = this.pieCanvas.nativeElement;
		ctx.height = 400;
		var data = [{
      data: [12, 19, 3, 5, 2, 3],
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)"
      ],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"],
      hoverOffset: 10,
      borderColor: "#fff"
  	}];
        
   	var options = {
	   	tooltips: {
	 			enabled: false
	    },
	    responsive:true,
			animation: {
				duration: 1000
			},
			plugins: {
			datalabels: {
				formatter: (value, ctx) => {
			  	let sum = 0;
			    let dataArr = ctx.chart.data.datasets[0].data;
			    dataArr.map(data => {
			        sum += data;
			    });
			    let percentage = (value*100 / sum).toFixed(2)+"%";
			    return percentage;
				},
			  color: '#fff',
				}
			}
		}
   
    
  	new Chart(ctx, {
  		plugins: [ChartDataLabels],
      type: "pie",
    	data: {
        datasets: data
      },
      options: options
    
    });

  }

}
