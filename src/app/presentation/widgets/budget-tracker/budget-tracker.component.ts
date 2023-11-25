import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {ActivatedRoute, Router} from '@angular/router';
import {RolesManager} from '../../../data/managers/roles.manager';
import * as Chart from 'chart.js';
import {BaseComponent} from '../../base-component/base-component';

declare var $: any;
declare var AmCharts: any;

@Component({
  selector: 'cuenca-budget-tracker',
  templateUrl: './budget-tracker.component.html',
  styleUrls: ['./budget-tracker.component.css']
})
export class BudgetTrackerComponent extends BaseComponent implements OnInit, AfterViewInit {

  @Input() public totals: any;
  @Input() public strId: any;

  constructor(protected proceduresManager: ProceduresManager,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              public rolesManager: RolesManager) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.paintDonut();
  }

  // torta / grafica dashboard inicial
  protected paintDonut(): void {
    const dataPersonal = {
      datasets: [{
        data: [
          this.totals['inversion_disponible'],
          this.totals['committed']
        ],
        backgroundColor: [
          'rgba(12, 238, 130, 1)',
          'rgba(209, 209, 209, 1)'
        ],
        borderWidth: 0,
      }],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
        'Disponible',
        'Comprometido'
      ]
    };

    const ctx1 = document.getElementById('donutBudget' + this.strId);
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
