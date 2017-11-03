import { Component, OnInit } from '@angular/core';
import { GooglePieChartService } from './../googlechartservice/google-pie-chart.service';
import { PieChartConfig } from './../googlechartservice/PieChartConfig';

declare var google: any;

//https://github.com/AnthonyGiretti/Angular4-GoogleCharts/blob/master/src/index.html
//http://anthonygiretti.com/2017/10/12/using-google-charts-in-angular-4-project-part-2/

//https://developers.google.com/chart/interactive/docs/gallery/table#formatters

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  data: any[];
  config: PieChartConfig;
  elementId: String;

  constructor(private _pieChartService: GooglePieChartService) { }
  
    ngOnInit() {
      //Piechart1 Data & Config
      this.data = [['Task', 'Hours per Day'],
      ['Eat',      3],
      ['Commute',  2],
      ['Watch TV', 5],
      ['Video games', 4],
      ['Sleep',    10]];
  
      this.config = new PieChartConfig('My Daily Activities at 20 years old', 0.4);
      this.elementId = 'myPieChart1';
      this._pieChartService.BuildPieChart(this.elementId, this.data, this.config); 
    }

      
      




}
