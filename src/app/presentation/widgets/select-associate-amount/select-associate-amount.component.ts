import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';


@Component({
  selector: 'app-select-associate-amount',
  templateUrl: './select-associate-amount.component.html',
  styleUrls: ['./select-associate-amount.component.scss']
})
export class SelectAssociateAmountComponent implements OnInit {

  @Input() record: any;
  @Output() senData: EventEmitter<any> = new EventEmitter();

  public arrAssociates: Array<any>;
  public strBudgetId: string;
  public strValue: number;
  public associatedSelectId: string;
  public amount: number;
  public associatesTotal: number;

  constructor(private messageService: MessagingService) {
    this.associatedSelectId = '0';
    this.amount = 0;
  }

  ngOnInit() {
    this.strBudgetId = this.record.id;
    this.strValue = this.record.value;
    this.arrAssociates = this.record.contribution;
    this.privateVerifiedAssociated();
  }

  privateVerifiedAssociated() {
    for (const associated of this.arrAssociates) {
      if (associated.contribution) {
        this.associatedSelectId = associated.associated_id;
        if (Number(associated.value) > 0) {
          associated.selected = true;
        }
      }
    }
    this.calculateAssociatesTotal();
  }

  public fnAddAssociated() {
    const component = this;
    if (this.associatesTotal < Number(this.strValue) || this.associatesTotal > Number(this.strValue)) {
      this.sendMessage('Error', 'El total de los asociados debe ser igual al valor de la acción', 'alert-danger');
    } else {
      const request: any = [];
      this.arrAssociates.forEach(function (associate: any) {
        if (associate.selected && associate.value > 0) {
          request.push({
            value: associate.value,
            budget_id: component.record.id,
            associated_id: associate.associated_id,
            process_id: Number(component.record.process_id),
            contribution_associated_id: associate.contribution_associated_id
          });
        }
      });
      this.senData.emit(request);
    }
  }

  private sendMessage(type: string, strMessage: string, style: string) {
    const message = {
      tipo: type,
      message: strMessage,
      style: style,
    };

    this.messageService.publish(new BusMessage('alerta', message));
  }

  public calculateAssociatesTotal() {
    const component = this;
    component.associatesTotal = 0;
    this.arrAssociates.forEach(function (associate: any) {
      if (!associate.value) {
        associate.value = 0;
      }
      component.associatesTotal = component.associatesTotal + Number(associate.value);
    });
  }
}
