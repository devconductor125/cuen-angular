import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {SupplierEvaluation} from '../../../data/model/forms/supplier-evaluation';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './supplier-evaluation.component.html',
  styleUrls: ['./supplier-evaluation.component.css']
})
export class SupplierEvaluationComponent implements OnInit, OnDestroy {
  public supplierEvaluation: SupplierEvaluation = new SupplierEvaluation();
  private monitoreoId: string;

  constructor(protected activatedRoute: ActivatedRoute,
              private cuencaVerdeService: CuencaVerdeService,
              private messagingService: MessagingService,
              private location: Location,
              protected router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .map((params: ParamMap) => +params.get('id') + '')
      .subscribe(monitoreoId => {
        this.monitoreoId = monitoreoId;
        this.cuencaVerdeService.getSupplierEvaluationForm(monitoreoId)
          .then(response => {
            if (response instanceof SupplierEvaluation) {
              this.supplierEvaluation = response;
            }
          })
          .catch(reason => console.log(reason));
      });
  }

  ngOnDestroy(): void {
  }

  calculateScore(): void {
    this.supplierEvaluation.calculateScore();
  }

  sendForm(): void {
    if (this.supplierEvaluation.isValid()) {
      this.cuencaVerdeService.sendSupplierEvaluationForm(this.monitoreoId, this.supplierEvaluation)
        .then(response => {
          const message = {
            'tipo': '',
            'message': 'Envío exitoso',
            'style': 'alert-success'
          };
          this.messagingService.publish(new BusMessage('alerta', message));
          const link = ['/view-monitoreos/' + this.monitoreoId];
          this.router.navigate(link);
        })
        .catch(reason => console.log(reason));
    } else {
      const message = {
        'tipo': 'Error',
        'message': 'Debes completar los campos',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
    }
  }
}
