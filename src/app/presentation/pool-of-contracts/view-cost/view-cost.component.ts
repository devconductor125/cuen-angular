import { Component, OnInit } from '@angular/core';
import { PoolOfContractsManager } from '../../../data/managers/pool-of-contracts.manager';
import { ActivatedRoute } from '@angular/router';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {BrowserUtils} from '../../../data/utils/browser.utils';

@Component({
  selector: 'app-view-cost',
  templateUrl: './view-cost.component.html',
  styleUrls: ['./view-cost.component.scss']
})
export class ViewCostComponent implements OnInit {

  public idPool: string;
  public dataReport: any;
  public dataReportThirdBudget: any;
  public boolExistThirdBudget: Boolean = false;
  constructor(private serviceManagerPool: PoolOfContractsManager,
              private activateRouter: ActivatedRoute,
              private cuencaServices: CuencaVerdeService) {
                this.idPool = this.activateRouter.snapshot.params.id;
              }

  ngOnInit() {
    this.getCostPoll();
    this.validateExistThirdBudget();
  }

  private getCostPoll() {
    this.serviceManagerPool.getCostByPoolId(this.idPool).then(
      (response) => {
        this.dataReport = response;
      }
    );
  }

  private validateExistThirdBudget() {
    this.serviceManagerPool.existThirdBudget(this.idPool).then(
      (response) => {
        if (response['verified'] === 'false') {
          this.boolExistThirdBudget = false;
        } else {
          this.getThirdExecution();
        }
      }
    );
  }

  private getThirdExecution() {
    this.serviceManagerPool.getThirdBudgetByPoolId(this.idPool).then(
      (response) => {
        this.dataReportThirdBudget = response;
        this.boolExistThirdBudget = true;
      }
    );
  }

  public downLoadExcel(type: number) {
    this.cuencaServices.downLoadExcel(type, this.idPool).then(
      (response) => {
        BrowserUtils.downloadExcelFromBlob(response);
      }
    );
  }
}
