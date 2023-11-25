import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessagingService} from '../../../data/services/messaging.service';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {RolesManager} from '../../../data/managers/roles.manager';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {BaseComponent} from '../../base-component/base-component';

@Component({
  selector: 'cuenca-tasks-list',
  templateUrl: './alerts-list.component.html',
  styleUrls: ['./alerts-list.component.css']
})
export class AlertsListComponent extends BaseComponent implements OnInit {

  public tareas: Array<any> = [];
  public predios: Array<any> = [];
  public prediosNoProcedure: Array<any> = [];
  public profile: any;

  constructor(protected messagingService: MessagingService,
              protected proceduresManager: ProceduresManager,
              protected tasksManager: TasksManager,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              public rolesManager: RolesManager,
              protected cuencaService: CuencaVerdeService) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    this.getTaskOvercome();
    this.getUserRoles(this);
  }


  protected onGotRoles(): void {
    this.getProfile();
  }

  private getProfile(): void {
    this.cuencaService.getProfile()
      .then((response: Array<JSON>) => {
        this.profile = response[0];
        this.getPrediosPotenciales();
        this.getPrediosPotencialesSinProcedimiento();
      });
  }

  private getTaskOvercome(): void {
    this.tasksManager.getTaskOvercome()
      .then((tareas: Array<any>) => {
        this.tareas = tareas;
      }, function () {
      });
  }

  getPrediosPotenciales(): void {
    const component = this;
    
    if (component.isAdministrativo || component.isJuridico || component.isCoordinador) {
      this.cuencaService.getPredios()
        .then((predios: Array<any>) => {
          if (predios instanceof Array) {
            predios = predios.filter((predio: any) => {
              const isUserSubtype = (String(predio.subtype_id) + '' === '7' && component.isCoordinador) ||
                (String(predio.subtype_id) + '' === '2' && component.isAdministrativo) ||
                (String(predio.subtype_id) + '' === '5' && component.isAdministrativo) ||
                (String(predio.subtype_id) + '' === '6' && component.isJuridico) ||
                (String(predio.subtype_id) + '' === '3' && component.isJuridico);
              return isUserSubtype && predio.archive_load + '' === '200';
            });
            predios.reverse();
            component.predios = predios;
          }
        });
    }
  }

  getPrediosPotencialesSinProcedimiento(): void {
    const component = this;
    if (component.isCoordinador) {
      this.cuencaService.getPrediosSinProcedimiento()
        .then((predios: Array<any>) => {
          if (predios instanceof Array) {
            predios.reverse();
            component.prediosNoProcedure = predios;
          }
        });
    }
  }
}
