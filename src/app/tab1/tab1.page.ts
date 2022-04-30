import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";
import { PickerController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
	mapAmount = new Map();
  mapNum = new Map();
  mapAbsReturn = new Map();
  home: string = "portfolio";
  dataReturned: any;
  dataAmount = [];
  dataNum = [];
  dataName=[];
  dataColour=[];
  defaultVal : any;

  @ViewChild("pieCanvas",{static:false}) pieCanvas: ElementRef;
  
  @ViewChild("pieCanvas2",{static:false}) pieCanvas2: ElementRef;

  private pieChart: Chart;

  constructor(private router: Router,public modalController: ModalController,private pickerController: PickerController){
    this.defaultVal="0";
  }
  private selectedTag: string;
  async presentPicker() {
    const picker = await this.pickerController.create({
  
      buttons: [
        {
          text: 'Confirm',
          handler: (selected) => {
            this.selectedTag = selected.animal.value;
          },
        }
      ],
      columns: [
        {
          name: 'options',
          options: [
            { text: 'health', value: 'health' },
            { text: 'purchase', value: 'purchase' },
            { text: 'transfer', value: 'transfer' },
            { text: 'investment', value: 'investment' },
          ]
        }
      ]
    });
    await picker.present();
  }
  ngOnInit(){
    console.log('Loading Home Page')
  	
      var chartColors = {
        Purchase: 'rgb(255, 168, 96)',
        Transfer: 'rgb(168, 216, 168)',
        Health: 'rgb(96, 192, 168)',
        Investment: 'rgb(48, 144, 192)',
        
        Others: 'rgb(216, 216, 192)',
      };
      this.mapNum.clear();
      this.mapAmount.clear();
      this.dataAmount = [];
      this.dataNum = [];
      this.dataName=[];
      this.dataColour=[];
      

      this.dataName.push("Purchase");
      this.dataAmount.push(10000);
      this.dataNum.push(1);
      var colour="Purchase";
      this.dataColour.push(chartColors[colour]);

      this.dataName.push("Transfer");
      this.dataAmount.push(20000);
      this.dataNum.push(1);
      var colour="Transfer";
      this.dataColour.push(chartColors[colour]);
      
      this.dataName.push("Health");
      this.dataAmount.push(10000);
      this.dataNum.push(1);
      var colour="Health";
      this.dataColour.push(chartColors[colour]);

      this.dataName.push("Investment");
      this.dataAmount.push(30000);
      this.dataNum.push(1);
      var colour="Investment";
      this.dataColour.push(chartColors[colour]);



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
              text: '',
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
