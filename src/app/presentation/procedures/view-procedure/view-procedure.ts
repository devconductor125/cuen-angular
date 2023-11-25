import {Component, OnInit} from '@angular/core';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {BaseComponent} from '../../base-component/base-component';
import {Procedure} from '../../../data/model/procedure';
import {RolesManager} from '../../../data/managers/roles.manager';
import {Program} from '../../../data/model/program';

@Component({
  selector: 'cuenca-view-procedures',
  templateUrl: './view-procedure.component.html',
  styleUrls: ['./view-procedure.component.css']
})
export class ViewProjectComponent extends BaseComponent implements OnInit {
  public procedureTypes: Array<Program> = [];
  public procedure: Procedure = new Procedure();
  public tasks: Array<any> = [];
  public intervention: Array<any> = [];
  public predio: string;
  public predioId: number;
  public percentage: number;
  public budgetP: any;

  constructor(protected messagingService: MessagingService,
              protected proceduresManager: ProceduresManager,
              protected router: Router,
              public rolesManager: RolesManager,
              private activatedRoute: ActivatedRoute) {
    super(proceduresManager, rolesManager);
  }

  ngOnInit(): void {
    const component = this;
    this.messagingService.publish(new BusMessage('onRouteChanged', null));

    // cargar todos los objetos del cache
    this.proceduresManager.loadAllObjects()
      .then(function () {
        component.loadProcedure();
      });
  }

  // cargar informacion del procedimiento seleccionado
  protected loadProcedure() {
    this.activatedRoute.paramMap
      .map((params: ParamMap) => +params.get('id') + '')
      .subscribe(id => {
        if (Number(id) > 0) {
          this.procedure.id = id;
          this.proceduresManager.getProcedureDetailsNew(id)
            .then(object => {
              this.procedure = object;
              this.getProcedureTasksAndPredio(this.procedure);
              this.bugdetByProcess();
              this.interventionUser();
              this.percentage = this.procedure.subTypeStep;
            });
        } else {
          const link = ['/app'];
          this.router.navigate(link);
        }
      });
  }

  private getProcedureTasksAndPredio(procedure: Procedure) {
    if (procedure) {
      this.proceduresManager.getProcedureTasksAndPredio(String(procedure.id))
        .then((tasks: any) => {
          if (tasks.task && tasks.task.length > 0) {
            tasks.task = tasks.task.filter(task => task.task_type_id + '' !== '3'); // No mostrar las tareas de visualizar predio
            this.tasks = tasks.task;
            this.predio = tasks.property;
            if (tasks.task && tasks.task.length > 0) {
              this.predioId = tasks.propertyId;
            }
          } else {
            this.tasks = [];
          }
        });
    }
  }

  private interventionUser() {
    this.proceduresManager.getInterventionProcess(String(this.procedure.id))
      .then(response => {
        this.intervention = response;
      });
  }

  private bugdetByProcess() {
    this.proceduresManager.bugdetByProcess(String(this.procedure.id))
      .then((response: any) => {
        this.budgetP = response;
      });
  }
}
