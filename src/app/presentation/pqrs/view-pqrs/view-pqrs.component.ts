import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {Location} from '@angular/common';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {PQRS} from '../../../data/model/pqrs';
import {PQRSType} from '../../../data/model/PQRSType';
import {Dependency} from '../../../data/model/Dependency';
import {RolesManager} from '../../../data/managers/roles.manager';
import {BaseComponent} from '../../base-component/base-component';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {MappingUtils} from '../../../data/utils/mapping.utils';

@Component({
  selector: 'cuenca-view-pqrs',
  templateUrl: './view-pqrs.component.html',
  styleUrls: ['./view-pqrs.component.css']
})
export class ViewPqrsComponent extends BaseComponent implements OnInit, OnDestroy {
  public pqrs: PQRS = new PQRS();
  public dependencies: Array<Dependency> = [];
  public pqrsTypes: Array<PQRSType> = [];

  constructor(protected activatedRoute: ActivatedRoute,
              private cuencaVerdeService: CuencaVerdeService,
              private messagingService: MessagingService,
              private location: Location,
              public proceduresManager: ProceduresManager,
              public rolesManager: RolesManager,
              private router: Router) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.messagingService.publish(new BusMessage('onRouteChanged', null));
    this.getUserRoles(this);
  }

  ngOnDestroy(): void {
  }

  protected onGotRoles(): void {
    this.getDependencies()
      .then(() => this.getPqrsTypes())
      .then(() => this.getObject());
  }

  private getObject() {
    this.activatedRoute.paramMap
      .map((params: ParamMap) => +params.get('id') + '')
      .subscribe(idString => {
        this.cuencaVerdeService.getPqrs(idString)
          .then((response: any) => {
            this.pqrs = MappingUtils.pqrsResponseToPQRS(this, response);
          })
          .catch(reason => console.log(reason));
      });
  }

  getDependencies(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cuencaVerdeService.getDependencies()
        .then((dependencies: Array<Dependency>) => {
          if (dependencies.length > 0) {
            if (dependencies[0].id !== '0') {
              const placeholder: Dependency = new Dependency();
              placeholder.id = '0';
              placeholder.name = 'Selecciona una dependencia';
              dependencies.unshift(placeholder);
            }
            if (!this.pqrs.id) {
              this.pqrs.dependency = dependencies[0];
            }
            this.dependencies = dependencies;
            resolve();
          }
        });
    });
  }

  getPqrsTypes(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.pqrsTypes = [];
      this.cuencaVerdeService.getPqrsTypes()
        .then((pqrsTypes: Array<PQRSType>) => {
          if (pqrsTypes.length > 0) {
            if (pqrsTypes[0].id !== '0') {
              const placeholder: PQRSType = new PQRSType();
              placeholder.id = '0';
              placeholder.name = 'Selecciona un tipo de PQRS';
              pqrsTypes.unshift(placeholder);
            }
            if (!this.pqrs.id) {
              this.pqrs.pqrsType = pqrsTypes[0];
            }
            this.pqrsTypes = pqrsTypes;
            resolve();
          }
        });
    });
  }

  updatePqrs(): void {
    if (this.pqrs.isValid()) {
      this.cuencaVerdeService.updatePqrs(this.pqrs)
        .then(response => {
          const message = {
            'tipo': 'Error',
            'message': 'Envío exitoso',
            'style': 'alert-success'
          };
          this.messagingService.publish(new BusMessage('alerta', message));
          const link = ['app/pqrs'];
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

  sendPqrsResponse(): void {
    if (this.pqrs.isValidForResponse()) {
      this.cuencaVerdeService.sendPqrsResponse(this.pqrs)
        .then(response => {
          const message = {
            'tipo': '',
            'message': 'Envío exitoso',
            'style': 'alert-success'
          };
          this.messagingService.publish(new BusMessage('alerta', message));
          this.location.back();
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
