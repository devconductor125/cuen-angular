import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Income} from '../../data/model/income';
import {ProceduresManager} from '../../data/managers/procedures.manager';
//declare var $: any;
@Component({
  selector: 'app-create-an-edit-income',
  templateUrl: './create-an-edit-income.component.html',
  styleUrls: ['./create-an-edit-income.component.scss']
})
export class CreateAnEditIncomeComponent implements OnInit {

  @Input() public disableFields: boolean;
  @Input() public objDataEdit: Income;
  @Output() public resetListIncome = new EventEmitter<any>();

  public objModelIncome: Income;
  public objBackupModel: Income;
  constructor(private services: ProceduresManager) {
    this.objModelIncome = new Income();
  }

  ngOnInit() {
  }

  public saveData() {
    if (this.disableFields) {
      this.objDataEdit.value = this.objDataEdit.value.replace(/\./g, '');
      this.objDataEdit.valueOrigin = this.objDataEdit.value;
      this.services.createIncome(this.objDataEdit).then(
        response => {
          this.getAllIncomes();
        }
      );
    } else {
      this.objDataEdit.value = this.objDataEdit.value.replace(/\./g, '');
      this.services.updateIncome(this.objDataEdit).then(
        (response) => {
          this.getAllIncomes();
        }
      );
    }
  }

  public getAllIncomes() {
    this.resetListIncome.emit();
  }

  formatSpecific(data: any, id: number) {
    const result = data.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.');
    if (id === 1) {
      $('#value').val(result);
    }
  }
}
