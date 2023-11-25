import {Component, OnDestroy, OnInit} from '@angular/core';

/*const Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);*/

@Component({
  selector: 'cuenca-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})

export class ReportsComponent implements OnInit, OnDestroy {
  private width: any;
  private color: any;
  private svg: any;
  private height: any;
  private radius: any;
  private pie: any;
  private arc: any;
  private outerArc: any;
  private key: any;

  constructor() {
  }

  ngOnInit(): void {
    this.initChart2();
  }

  ngOnDestroy() {
  }

  private initChart2() {
    /*const myChart = Highcharts.chart('high-chart', {

      chart: {
        type: 'column'
      },

      title: {
        text: 'Styling axes and columns'
      },

      yAxis: [{
        className: 'highcharts-color-0',
        title: {
          text: 'Primary axis'
        }
      }, {
        className: 'highcharts-color-1',
        opposite: true,
        title: {
          text: 'Secondary axis'
        }
      }],

      plotOptions: {
        column: {
          borderRadius: 5
        }
      },

      series: [{
        data: [1, 3, 2, 4]
      }, {
        data: [324, 124, 547, 221],
        yAxis: 1
      }]
    });*/
  }
}
