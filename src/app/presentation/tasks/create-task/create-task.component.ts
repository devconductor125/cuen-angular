import {Component, OnInit, ViewChild} from '@angular/core';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BaseComponent} from '../../base-component/base-component';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {Task} from '../../../data/model/task';
import {Procedure} from '../../../data/model/procedure';
import {User} from '../../../data/model/user';
import {CuencaVerdeService} from '../../../data/services/cuenca-verde.service';
import {RolesManager} from '../../../data/managers/roles.manager';
import {Activity} from '../../../data/model/activity';
import {TaskType} from '../../../data/model/task-type';
import {MuestreoHidricoExtraInfo} from '../../../data/model/muestreo-hidrico-extra-info';
import {AssociatedContribution, ProcedureActivity} from '../../../data/model/procedure-activity';
import {Species, SpeciesContribution} from '../../../data/model/species-contribution';
import {DragAndDropOpenTaskCreationComponent} from '../../widgets/drag-and-drop-open-task-creation/drag-and-drop-open-task-creation.component';
import Role = roleInterface.Role;

@Component({
  selector: 'cuenca-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent extends BaseComponent implements OnInit {

  public procedures: Array<Procedure> = [];
  public referrerProcedure: Procedure;
  public activities: Array<Activity> = [];
  public procedureActivities: Array<ProcedureActivity> = [];
  public taskTypes: Array<TaskType>;
  public roles: Array<Role> = [];
  public users: Array<User> = [];

  public usersSelected: Array<any> = [];
  public predios: Array<any> = [];
  public dataQuantity: Array<any> = [];

  public task: Task = new Task();
  public labelPredio: String = '';
  public procedureTypeTitle: String = '';
  public communicationsTaskType: any = null;
  public communicationsTaskTypes: Array<any>;

  public typeAporte: String = '0';
  public activity: String = '0';
  public valueAporte: String;
  public aporteData: String = '0';
  public listAssociated: Array<any> = [];
  public listAssociatedForSpecialTask: Array<any> = [];
  public speciesList: Array<SpeciesContribution> = [];

  public numberMonth: String;
  public valuePerMonth: String;

  public typeProcess: String;

  public existPredio: Boolean = false;
  public noSelect: Boolean = true;
  public showExtraFields: Boolean = true;
  public canShowPredioSection: Boolean = false;
  public canShowAporteSelection: Boolean = false;
  public canShowAporteValue: Boolean = false;
  public canShowActivitySelection: Boolean = true;
  public canShowAssociateSelection: Boolean = true;
  public canSwitchProcedure: Boolean = true;
  public hasContributions: Boolean = false;
  public muestreoHidricoExtraInfo: MuestreoHidricoExtraInfo;

  @ViewChild('fileUploader') fileUploader: DragAndDropOpenTaskCreationComponent;

  constructor(protected messagingService: MessagingService,
              protected proceduresManager: ProceduresManager,
              protected tasksManager: TasksManager,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              protected cuencaServices: CuencaVerdeService,
              public rolesManager: RolesManager) {
    super(proceduresManager, rolesManager);
  }

  protected getCustomPlaceholder(customMessage: string): any {
    return super.getCustomPlaceholder(customMessage);
  }

  ngOnInit(): void {
    this.getUserRoles(this);
    this.messagingService.publish(new BusMessage('onRouteChanged', null));
    this.muestreoHidricoExtraInfo = new MuestreoHidricoExtraInfo();
  }


  protected onGotRoles(): void {
    this.tasksManager.loadAllObjects();
    this.getPredios(); /// list predios
    this.getProcedures(this) /// list procedimientos
      .then(this.getRoles);
    this.onDataLoaded();
  }

  protected onDataLoaded(): void {
    this.activatedRoute.paramMap
      .map((params: ParamMap) => +params.get('id') + '')
      .subscribe(idString => {
        const id: number = Number(idString);
        if (id > 0) {
          this.setReferrerProcedure(id);
        }
      });
  }

  // formato especificaos para numeros
  formatSpecific(data: any, id: number) {
    // decimal format
    const result = data.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.');
    //// this.datosCosto.coste = result;
    if (id === 1) {
      $('#labelselect01').val(result);
    }

    if (id === 2) {
      $('#labelselect001').val(result);
    }

  }

  // lista de procedimientos
  private getProcedures(component: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.proceduresManager.loadAllObjects()
        .then(procedures => {
          if (this.isComunicaciones) {
            procedures = procedures.filter((procedure: any) => procedure.type_process === 'comunicacion');
          } else {
            procedures = procedures.filter((procedure: any) => procedure.type_process !== 'comunicacion');
          }
          if (procedures.length === 0 || procedures[0].id !== 0) {
            const placeholder = this.getCustomPlaceholder('Selecciona un procedimiento');
            procedures.unshift(placeholder);
          }
          this.procedures = procedures;
          this.task.procedure = procedures[0];
          this.mapProcedure();
          this.initCommunicationsTaskTypes();
          resolve(component);
        });
    });
  }

  private mapProcedure() {
    const component = this;
    if (component.referrerProcedure) {
      component.procedures.forEach(function (procedure: Procedure) {
        if (Number(procedure.id) === Number(component.referrerProcedure.id)) {
          component.task.procedure = procedure;
          if (component.task.isShouldBeOpen()) {
            component.getOpenRoles(component);
          } else if (component.task.procedure.type_process === 'gestion') {
            component.getRolesForGestion(component);
          }
          component.getTaskTypes();
          component.getProcedurePredios();
          component.typeProcess = component.task.procedure.type_process;
          component.setOpenTasksVisibility();
          component.setCanShowAporteSelection();
          component.setCanShowActivitySelection();
          component.setProcedureTypeTitle(component);
          if (component.canSwitchProcedure) {
            component.task.open = false;
            component.task.special = false;
          }
        }
      });
    }
  }

  public filterOpenTasksRoles(roles: any, procedure: any): any {
    if (procedure.type_process === 'comunicacion') {
      roles = roles.filter(role => (role.id + '' === '13' || role.id + '' === '17'));
    }
    if (procedure.type_process === 'hidrico') {
      roles = roles.filter(role => role.id + '' === '14');
    }
    if (procedure.type_process === 'erosion') {
      roles = roles.filter(role => role.id + '' === '3');
    }
    if (procedure.type_process === 'psa') {
      roles = roles.filter(role => role.id + '' === '3');
    }
    return roles;
  }

  // lista de predios
  private getPredios(): Promise<any> {
    const component = this;
    return new Promise((resolve, reject) => {
      this.cuencaServices.getPredios()
        .then(p => {
          this.predios = p;
          resolve(component);
        });
    });
  }

  public getActivitiesByContribution(contributionType: string) {
    this.procedureActivities = [];
    this.resetActivityAndAporteSelectors();
    this.setCanShowActivitySelection();

    if (this.typeAporte !== '0' && ((this.task.special && this.task.procedure.type_process !== 'psa') || (this.task.procedure.type_process === 'gestion' && this.task.open))) {
      this.cuencaServices.getActivitiesByContribution(this.task.procedure.id, contributionType)
        .then(activities => {
          this.procedureActivities = activities;
        });
    } else {
      if (this.task.canSkipActivitySelection()) {
        this.getAssociatedTask();
      }
    }
  }

  private getAssociatedTask(): Promise<any> {
    this.listAssociated = [];
    const component = this;
    if (this.task.needsToFetchSpecialAssociates()) {
      return new Promise((resolve, reject) => {
        let typeProcess = this.typeProcess;
        if (this.isComunicaciones) {
          if (this.communicationsTaskType === 'Encuentro con actores') {
            typeProcess = 'encuentro';
          } else if (this.communicationsTaskType === 'Plan de comunicaciones') {
            typeProcess = 'plan';
          } else if (this.communicationsTaskType === 'Experiencias de Educación Ambiental') {
            typeProcess = 'experiencias';
          }
        }
        this.cuencaServices.getAssociatedTask(typeProcess)
          .then((response: any) => {
            if (response.code === 500) {
              component.aporteData = '0';
              const message = {
                'tipo': 'Error',
                'message': 'No existen asociados con aportes',
                'style': 'alert-danger'
              };
              this.messagingService.publish(new BusMessage('alerta', message));
            } else {
              component.listAssociated = [];
              if (component.typeProcess === 'psa') {
                component.listAssociated = response.type_1;
              }
              if (this.typeAporte === '1') {
                this.listAssociated = response.type_1;
                if (this.listAssociated.length === 0) {
                  this.showNoCashContributionsErrorMessage();
                }
              }
              if (this.typeAporte === '2') {
                this.listAssociated = response.type_2;
                if (this.listAssociated.length === 0) {
                  this.showNoSpeciesContributionsErrorMessage();
                }
              }
              component.aporteData = '0';
              component.listAssociatedForSpecialTask = component.listAssociated.slice();
              this.hasContributions = this.listAssociated.length > 0;
            }
            this.listAssociated.forEach(function (associated: any) {
              if (associated.species) {
                associated.species.forEach(function (specie: any) {
                  if (!specie.newBalance) {
                    specie.newBalance = 0;
                  }
                });
              }
            });
          });
      });
    } else {
      component.listAssociated = [];
      component.procedureActivities.forEach(function (procedureActivity: ProcedureActivity) {
        if (procedureActivity.associated_contribution.length > 0) {
          component.hasContributions = true;
          procedureActivity.associated_contribution.forEach(function (contribution: AssociatedContribution) {
            component.listAssociated.push({
              id: contribution.id,
              associated_name: contribution.associated_name
            });
          });
        } else {
          component.showNoAssociatesInActivityErrorMessage();
          component.hasContributions = false;
        }
      });
    }
  }

  // lista de roles para el tipo de tarea seleccionado
  public getRolesOnOpenStateChanged(): void {
    if (this.task.open && !this.task.special && this.task.isNotGestion()) {
      this.getOpenRoles(this);
    } else {
      if (this.task.special) {
        this.getAllRoles(this);
      } else {
        if (!this.task.isNotGestion() && this.task.open) {
          this.getAllRoles(this);
        } else {
          this.getRolesForGestion(this);
        }
      }
    }
  }

  public changeProcedure(): void {
    this.setReferrerProcedure(this.task.procedure.id);
  }

  private getAllRoles(component: any): void {
    component.rolesManager.getAllRolesSpecialTask()
      .then((roles: Array<Role>) => {
        if (roles.length > 0) {
          if (roles[0].id !== 0) {
            const placeholder = component.getCustomPlaceholder('Selecciona un rol');
            roles.unshift(placeholder);
          }
          component.roles = roles;
          component.task.role = roles[0];

          component.task.user = '0';
          component.users = [];
        }
      });
  }

  private getRoles(component: any): Promise<any> {
    return new Promise((resolve) => {
      component.rolesManager.getAllRoles()
        .then((roles: Array<Role>) => {
          if (roles.length > 0) {
            if (roles[0].id !== 0) {
              const placeholder = component.getCustomPlaceholder('Selecciona un rol');
              roles.unshift(placeholder);
            }
            component.roles = roles;
            component.task.role = roles[0];

            component.task.user = '0';
            component.users = [];
            resolve(component);
            component.onDataLoaded();
          }
        });
    });
  }

  private getRolesForGestion(component: any): void {
    component.rolesManager.getAllRoles()
      .then((roles: Array<Role>) => {
        if (roles.length > 0) {
          roles = roles.filter(role => role.id + '' === '3');
          if (roles[0].id !== 0) {
            const placeholder = component.getCustomPlaceholder('Selecciona un rol');
            roles.unshift(placeholder);
          }
          component.roles = roles;
          component.task.role = roles[0];

          component.task.user = '0';
          component.users = [];
        }
      });
  }

  // lista de roles tareas abiertas
  private getOpenRoles(component: any): Promise<any> {
    return new Promise((resolve) => {
      component.rolesManager.getOpenRoles()
        .then((roles: Array<Role>) => {
          if (roles.length > 0) {
            roles = component.filterOpenTasksRoles(roles, component.task.procedure);
            if (roles[0].id !== 0) {
              const placeholder = component.getCustomPlaceholder('Selecciona un rol');
              roles.unshift(placeholder);
            }
            component.roles = roles;
            component.task.role = roles[0];
            component.task.user = 0;
            resolve();
          }
        });
    });
  }

  // lista de usuarios
  public getUsers(): Promise<any> {
    this.usersSelected = [];
    const component = this;
    this.users = [];

    return new Promise((resolve) => {
      component.proceduresManager.getUsers(component.task.role.id)
        .then((users: Array<User>) => {
          component.users = users;
          resolve();
        });
    });
  }

  // cada vez que se selecciona un predio
  selectPredio(name: String): void {
    this.labelPredio = name;
  }

  // arreglo creado para asignar tarea a varios usuarios
  addUserArray(dato: Boolean, pos: string, value: string): void {
    if (dato) {
      this.usersSelected[pos] = value;
    } else {
      this.usersSelected.splice(Number(pos), 1);
    }
  }

  addUserArrayOption(event: any): void {
    this.usersSelected = [];
    this.usersSelected.push(event.id);
  }

  // Listado de actividades
  public getActivities(): void {
    this.tasksManager.getActivities(this.task.procedure)
      .then(activities => {
        if (activities instanceof Array) {
          this.activities = activities;
        }
      });
  }

  // tipoo de tareas
  public getTaskTypes(): Promise<any> {
    const component = this;
    return new Promise((resolve, reject) => {
      if (Number(component.task.procedure.id) === 0) {
        this.taskTypes = null;
        reject();
      }
      this.tasksManager.getTaskTypes(Number(component.task.procedure.id))
        .then(taskTypes => {
          if (taskTypes instanceof Array) {
            this.taskTypes = taskTypes;
            if (!component.task.id) {
              const placeholder = this.getCustomPlaceholder('Selecciona un tipo de tarea');
              taskTypes.unshift(placeholder);
              this.task.taskType = placeholder;
            } else {
              this.task.taskType = taskTypes[0];
            }
          }
        });
    });
  }

  // tipo de aporte
  public setTypeAporte(): void {
    this.getAssociatedTask();
  }

  // get predio por id del procedimiento
  public getProcedurePredios() {
    const component = this;
    this.cuencaServices.getPrediosProc(Number(component.task.procedure.id))
      .then(predios => {
        if (predios.length > 0) {
          this.canShowPredioSection = predios[0].select;
          if (Number(component.task.procedure.id) > 0) {
            if (predios[0].select) {
              component.existPredio = true;
              component.task.property = predios[1].id;
              component.labelPredio = predios[1].property_name;
              component.noSelect = false;
            } else {
              component.existPredio = false;
              component.task.property = null;
              component.noSelect = false;
              this.getPredios()
                .then();
            }
          } else {
            component.predios = null;
            component.task.property = null;
            component.existPredio = false;
            component.noSelect = true;
          }
        }
      });
  }

  // set objeto de presupuesto segun la tarea a enviar
  setBudgetOpen(): void {
    const component = this;
    const objetoPresupuesto: any = [];
    this.listAssociated.forEach(function (associated: any) {
      if (associated.selected) {
        if (component.task.procedure.type_process === 'psa') {
          component.valuePerMonth = component.valuePerMonth.replace(/\./g, '');
          objetoPresupuesto.push({
            'value': (associated.value) ? associated.value : null,
            'proccess_id': component.task.procedure.id,
            'contribution_id': associated.id,
            'contribution_type': 1,
            'activity': component.activity
          });
        } else if (component.task.isShouldBeOpen()) {
          objetoPresupuesto.push({
            'value': (associated.value) ? associated.value : null,
            'proccess_id': component.task.procedure.id,
            'contribution_id': associated.id,
            'contribution_type': Number(component.typeAporte),
            'activity': component.activity
          });
        }
      }
    });
    this.task.budgetOpen = objetoPresupuesto;
  }

  public createTask(): void {
    this.setBudgetOpen();
    if (this.isComunicaciones) {
      this.task.procedure.type_comunication = this.communicationsTaskType;
    }
    if (this.isValidTask()) {
      const species: any = [];
      this.listAssociated.forEach(function (associated) {
        if (associated.selected && associated.species) {
          associated.species.forEach(function (specie: any) {
            if (specie.selected) {
              species.push(specie);
            }
          });
        }
      });
      this.tasksManager.createTask(this.task, this.usersSelected, species, this.numberMonth, this.valuePerMonth)
        .then((response: any) => {
          if (response.code === 500) {
            const message = {
              'tipo': 'Error',
              'message': response.message,
              'style': 'alert-danger'
            };
            this.messagingService.publish(new BusMessage('alerta', message));
          } else {
            if (this.task.procedure.type_process === 'hidrico') {
              this.cuencaServices.sendHidricoFormExtraInfo(response.object_id, this.muestreoHidricoExtraInfo)
                .then(() => {
                  this.fileUploader.uploadFiles(response.object_id)
                    .then(() => this.onTaskSaved());
                });
            } else {
              this.fileUploader.uploadFiles(response.object_id)
                .then(() => this.onTaskSaved());
            }
          }
        });
    }
  }

  private onTaskSaved(): void {
    const message = {
      'tipo': 'Registrada',
      'message': 'La tarea ha sido registrada satisfactoriamente',
      'style': 'alert-success'
    };
    this.messagingService.publish(new BusMessage('alerta', message));
    const link = ['/app/tasks'];
    this.router.navigate(link);
  }

  // validar tarea
  protected isValidTask(): boolean {
    if (this.task.procedure.type_process === 'hidrico' && !this.task.special && !this.isValidHidricoForm(this.muestreoHidricoExtraInfo)) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa todos los datos de PLAN DE MUESTREO Y REGISTRO DE DATOS DE CAMPO',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (Number(this.task.procedure.id) <= 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona un Procedimiento',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }

    if (this.isComunicaciones && !this.task.procedure.type_comunication) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona un tipo de tarea de comunicaciones',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }

// Si es PSA
    if (this.task.procedure.type_process === 'psa') {

      if (!this.numberMonth || this.numberMonth.length === 0) {
        const message = {
          'tipo': 'Error: ',
          'message': 'Ingresa el número de Meses',
          'style': 'alert-danger'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
        return false;
      }

      if (!this.valuePerMonth || this.valuePerMonth.length === 0) {
        const message = {
          'tipo': 'Error: ',
          'message': 'Ingresa el valor por Mes',
          'style': 'alert-danger'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
        return false;
      }
    }

    if (this.task.isShouldBeOpen()) {

      /*if (Number(this.aporteData) <= 0) {
        const message = {
          'tipo': 'Error: ',
          'message': 'Selecciona un Asociado',
          'style': 'alert-danger'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
        return false;
      }*/

      if (Number(this.typeAporte) <= 0) {
        const message = {
          'tipo': 'Error: ',
          'message': 'Selecciona un Tipo de Aporte',
          'style': 'alert-danger'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
        return false;
      }

      /*if (this.typeAporte === '1') {
        if (!this.valueAporte || this.valueAporte.length === 0) {
          const message = {
            'tipo': 'Error: ',
            'message': 'Ingresa el valor del aporte',
            'style': 'alert-danger'
          };
          this.messagingService.publish(new BusMessage('alerta', message));
          return false;
        }
      }*/

      const component = this;
      let continueFlow = true;

      if (this.typeAporte === '2') {
        this.speciesList.forEach(function (contribution) {
          contribution.species.forEach(function (activeSpecies) {
            if (activeSpecies.selected && (activeSpecies.newBalance <= 0 || activeSpecies.newBalance > activeSpecies.balance)) {
              const message = {
                'tipo': 'Error: ',
                'message': 'Ingresa un valor válido para el aporte en especie',
                'style': 'alert-danger'
              };
              component.messagingService.publish(new BusMessage('alerta', message));
              continueFlow = false;
            }
          });
        });
      }
      if (!continueFlow) {
        return false;
      }
    }

    if (this.task.procedure.type_process === 'comunicacion') {

      if (Number(this.task.procedure.type_comunication) <= 0) {
        const message = {
          'tipo': 'Error: ',
          'message': 'Selecciona un Tipo de tarea de comunicación',
          'style': 'alert-danger'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
        return false;
      }

    }

    if (this.showExtraFields) {
      if ((!this.task.property || this.task.property.length === 0) && !this.task.open) {
        const message = {
          'tipo': 'Error: ',
          'message': 'Selecciona un Predio',
          'style': 'alert-danger'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
        return false;
      }
      if (!this.task.startdate) {
        const message = {
          'tipo': 'Error: ',
          'message': 'Selecciona la fecha de inicio',
          'style': 'alert-danger'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
        return false;
      }
      if (!this.task.option_date && !this.task.deadline) {
        const message = {
          'tipo': 'Error: ',
          'message': 'Selecciona la fecha de finalización',
          'style': 'alert-danger'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
        return false;
      }
      if (!this.task.description || this.task.description.length === 0) {
        const message = {
          'tipo': 'Error: ',
          'message': 'Ingresa la descripción de la tarea',
          'style': 'alert-danger'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
        return false;
      }
    }

    if ((!this.task.role || Number(this.task.role.id) === 0) && !this.task.special) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona un rol',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (this.usersSelected.length === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona al menos un usuario',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    return true;
  }

  private getRecursoHídricoRoles(roles: Array<Role>): Array<Role> {
    return roles.filter(rol =>
      String(rol.id) === '10' ||
      String(rol.id) === '3' ||
      String(rol.id) === '4' ||
      String(rol.id) === '9' ||
      String(rol.id) === '14' ||
      String(rol.id) === '0'); /// Solo coordinaciones recurso hidrico
  }

  private initCommunicationsTaskTypes() {
    this.communicationsTaskTypes = [
      {name: 'Encuentro con actores'},
      {name: 'Plan de comunicaciones'},
      {name: 'Experiencias de Educación Ambiental'}
    ];
  }

  private isValidHidricoForm(muestreoHidricoExtraInfo: MuestreoHidricoExtraInfo) {
    return muestreoHidricoExtraInfo.place &&
      muestreoHidricoExtraInfo.time &&
      muestreoHidricoExtraInfo.user &&
      muestreoHidricoExtraInfo.type &&
      muestreoHidricoExtraInfo.sampleType &&
      muestreoHidricoExtraInfo.estimatedTimeFrame &&
      muestreoHidricoExtraInfo.sampleQuantity &&
      muestreoHidricoExtraInfo.basin &&
      muestreoHidricoExtraInfo.stream;
  }

  private setOpenTasksVisibility() {
    this.canShowSpecialCheckbox = this.task.isSpecialTaskVisibility();
    this.isDisabledSpecialCheckbox = this.task.isDisabledSpecialCheckbox();
    this.isOpenTaskChecked = this.task.isOpenTaskVisibility();
  }

  private setCanShowAporteSelection() {
    this.typeAporte = '0';
    this.canShowAporteSelection = (this.isComunicaciones ? !!this.communicationsTaskType : true) || this.task.isCanShowAporteSelection();
  }

  public setCanShowAporteValue() {
    this.canShowAporteValue = this.aporteData !== '0' && this.typeAporte.toString() === '1' && this.task.isCanShowAporteValue();
    if (this.typeAporte === '2') {
      this.getSpeciesList();
    }
  }

  public setCanShowActivitySelection() {
    this.canShowActivitySelection = this.task.needsToFetchActivities();
  }

  public resetSelectors() {
    this.typeAporte = '0';
    this.resetActivityAndAporteSelectors();
  }

  private resetActivityAndAporteSelectors() {
    this.activity = '0';
    this.aporteData = '0';
  }

  public getSpeciesList() {
    this.speciesList = [];
    const component = this;
    if (this.typeAporte !== '0' && this.task.special && this.activity && this.task.procedure.type_process !== 'psa') {
      this.cuencaServices.getSpeciesList(this.activity)
        .then(speciesList => {
          if (speciesList instanceof Array) {
            const filteredSpeciesList: any = speciesList.filter(species => species.associated_id + '' === this.aporteData + '');
            if (filteredSpeciesList.length > 0) {
              this.speciesList = filteredSpeciesList.map(species => {
                species.species = species.species.map(speciesValue => {
                  speciesValue.newBalance = 0;
                  return speciesValue;
                });
                return species;
              });
              this.speciesList = filteredSpeciesList;
            } else {
              this.showNoSpeciesAssociatesErrorMessage();
            }
          }
        });
    } else {
      this.listAssociated.forEach(function (associated) {
        if (associated.species) {
          associated.species = associated.species.map(speciesValue => {
            speciesValue.newBalance = 0;
            return speciesValue;
          });
          component.speciesList.push(associated);
        }
      });
    }
  }

  public validateNewBalance(species: Species) {
    if (species.newBalance < 0) {
      species.newBalance = 0;
    } else if (species.newBalance > species.balance) {
      species.newBalance = species.balance;
    }
  }

  public setProcedureTypeTitle(component: any) {
    component.procedureTypeTitle = '';
    switch (component.task.procedure.type_process) {
      case 'erosion':
        component.procedureTypeTitle = '| Procedimiento tipo procesos erosivos';
        break;
      case 'abierta':
        component.procedureTypeTitle = '| Procedimiento tipo abierto';
        break;
      case 'psa':
        component.procedureTypeTitle = '| Procedimiento tipo PSA';
        break;
      case 'hidrico':
        component.procedureTypeTitle = '| Procedimiento tipo monitoreo de fuentes hídricas';
        break;
      case 'comunicacion':
        component.procedureTypeTitle = '| Procedimiento tipo comunicaciones';
        break;
      case 'gestion':
        component.procedureTypeTitle = '| Procedimiento tipo gestión predial';
        break;
    }
  }

  private showNoAssociatesInActivityErrorMessage() {
    const message = {
      'tipo': 'Error: ',
      'message': 'La actividad no tiene contribuciones',
      'style': 'alert-danger'
    };
    this.messagingService.publish(new BusMessage('alerta', message));
  }

  private showNoCashContributionsErrorMessage() {
    const message = {
      'tipo': 'Error: ',
      'message': 'El asociado no tiene aportes en dinero',
      'style': 'alert-danger'
    };
    this.messagingService.publish(new BusMessage('alerta', message));
  }

  private showNoSpeciesContributionsErrorMessage() {
    const message = {
      'tipo': 'Error: ',
      'message': 'No hay aportes en especie para agregar',
      'style': 'alert-danger'
    };
    this.messagingService.publish(new BusMessage('alerta', message));
  }

  private showNoSpeciesAssociatesErrorMessage() {
    const message = {
      'tipo': 'Error: ',
      'message': 'El asociado no tiene aportes en especie',
      'style': 'alert-danger'
    };
    this.messagingService.publish(new BusMessage('alerta', message));
  }

  private setReferrerProcedure(id: any) {
    this.proceduresManager.getObjectForEdit(String(id))
      .then((procedure: Procedure) => {
        this.referrerProcedure = procedure;
        this.canSwitchProcedure = false;
        this.mapProcedure();
      });
  }
}
