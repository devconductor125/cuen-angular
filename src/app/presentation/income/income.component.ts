import {Component, OnInit, ViewChild} from '@angular/core';
import {Income} from '../../data/model/income';
import {ProceduresManager} from '../../data/managers/procedures.manager';
import {CreateAnEditIncomeComponent} from '../create-an-edit-income/create-an-edit-income.component';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  public createIncome: boolean;
  public arrIncomes: Array<Income> = [];
  public setDataIncome: Income;
  constructor(private services: ProceduresManager) {
    this.setDataIncome = new Income();
  }

  ngOnInit() {
    this.createIncome = true;
    this.getAllIncomes();
  }

  public getAllIncomes() {
    this.services.getAllIncomes().then(
      (response: Array<Income>) => {
        this.arrIncomes = response;
        this.formatAllValues();
      }
    );
  }

  public setEditIncome(setEditIncome: Income) {
    this.createIncome = false;
    this.setDataIncome = setEditIncome;
  }

  public setVarCreate() {
    this.setDataIncome = new Income();
    this.createIncome = true;
  }

  private formatAllValues() {
    for (let i in this.arrIncomes) {
      this.arrIncomes[i].valueOrigin = this.arrIncomes[i].valueOrigin.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.');
      this.arrIncomes[i].value = this.arrIncomes[i].value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.');
    }
  }
}
