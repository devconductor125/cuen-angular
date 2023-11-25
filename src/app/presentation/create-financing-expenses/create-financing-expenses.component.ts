import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Expense} from '../../data/model/expense';
import {ProceduresManager} from '../../data/managers/procedures.manager';

@Component({
  selector: 'app-create-financing-expenses',
  templateUrl: './create-financing-expenses.component.html',
  styleUrls: ['./create-financing-expenses.component.scss']
})
export class CreateFinancingExpensesComponent implements OnInit {

  @Input() public objModelFinancingExpenses: Expense;
  @Input() public boolCreate: boolean;

  @Output() public getAllExpenses = new EventEmitter<any>();

  constructor(private services: ProceduresManager) { }

  ngOnInit() {
  }

  public saveExpense() {
    if (this.boolCreate) {
      this.objModelFinancingExpenses.value = this.objModelFinancingExpenses.value.replace(/\./g, '');
      this.objModelFinancingExpenses.valueOrigin = this.objModelFinancingExpenses.value;
      this.objModelFinancingExpenses.balance = this.objModelFinancingExpenses.value;
      this.services.createFinancingExpense(this.objModelFinancingExpenses).then(
        (response) => {
          console.log('response create:::  ', response);
          this.eventGetAllExpenses();
        }
      );
    } else {
      this.objModelFinancingExpenses.value = this.objModelFinancingExpenses.value.replace(/\./g, '');
      this.objModelFinancingExpenses.balance = this.objModelFinancingExpenses.value;
      this.services.updateExpense(this.objModelFinancingExpenses).then(
        (response) => {
          console.log('response edit:::  ', response);
          this.eventGetAllExpenses();
        }, error => {
          console.log(error);
        }
      );
    }
  }

  private eventGetAllExpenses() {
    this.getAllExpenses.emit();
  }

  public formatSpecific(data: any, id: number) {
    const result = data.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.');
    if (id === 1) {
      $('#value').val(result);
    }
  }

}
