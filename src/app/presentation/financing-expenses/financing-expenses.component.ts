import { Component, OnInit } from '@angular/core';
import {Expense} from '../../data/model/expense';
import {ProceduresManager} from '../../data/managers/procedures.manager';

@Component({
  selector: 'app-financing-expenses',
  templateUrl: './financing-expenses.component.html',
  styleUrls: ['./financing-expenses.component.scss']
})
export class FinancingExpensesComponent implements OnInit {

  public objModelExpense: Expense;
  public boolCreate: boolean;
  public strTotalExpense: string;
  public arrFinancingExpense: Array<Expense> = [];
  constructor(private services: ProceduresManager) {
    this.objModelExpense = new Expense();
    this.boolCreate = true;
  }

  ngOnInit() {
    this.getAllExpenses();
  }

  public setVarCreate() {
    this.objModelExpense = new Expense();
    this.boolCreate = true;
  }

  public setEditFinancingExpense(modelExpense: Expense) {
    this.objModelExpense = modelExpense;
    this.boolCreate = false;
  }

  public getAllExpenses() {
    this.services.getAllFinancingExpenses().then(
      (response) => {
        this.arrFinancingExpense = response.data;
        this.strTotalExpense = response.totalExpense;
        this.formarNumeric();
      }
    );
  }

  private formarNumeric() {
    for (let i in this.arrFinancingExpense) {
      this.arrFinancingExpense[i].value = this.arrFinancingExpense[i].value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.');
      this.arrFinancingExpense[i].valueOrigin = this.arrFinancingExpense[i].valueOrigin.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.');
    }
  }

}
