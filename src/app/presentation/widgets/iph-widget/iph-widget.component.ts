import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-iph-widget',
  templateUrl: './iph-widget.component.html',
  styleUrls: ['./iph-widget.component.scss']
})
export class IphWidgetComponent implements OnInit, AfterViewInit {

  public totals: any;
  public strNameBasin: string;
  public objData: object = {
    restauracion: 0,
    bosques: 0,
    practicas: 0,
    totalHa: 0,
  };

  @Input() public strId: string;
  public dataReportGerencial: Array<any> = [];
  constructor() { }

  ngOnInit() {
    if ( this.strId ===  '1') {
      this.strNameBasin = 'LA FE';
      this.objData['totalHa'] = 750;
      this.objData['restauracion'] = 310;
      this.objData['bosques'] = 130;
      this.objData['practicas'] = 180;
    } else {
      this.strNameBasin = 'RIO GRANDE 2';
      this.objData['totalHa'] = 1150;
      this.objData['restauracion'] = 580;
      this.objData['bosques'] = 255;
      this.objData['practicas']  = 430;
    }
  }
  ngAfterViewInit() {
    this.paintDonut();
  }


  // torta / grafica dashboard inicial
  protected paintDonut(): void {
    const dataPersonal = {
      datasets: [{
        data: [
          this.objData['restauracion'],
          this.objData['bosques'],
          this.objData['practicas']
        ],
        backgroundColor: [
          'rgba(12, 238, 130, 1)',
          'rgba(209, 209, 209, 1)',
          'rgba(12, 91, 237, 1)'
        ],
        borderWidth: 0,
      }],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
        'Restauracion',
        'Bosques',
        'Practicas'
      ]
    };

    const ctx1 = document.getElementById('donutBudget' + this.strId );
    const myChart1 = new Chart(ctx1, {
      type: 'doughnut',
      data: dataPersonal,
      options: {
        legend: {
          display: false
        },
      }
    });
  }

}
