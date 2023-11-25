import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BusMessage, MessagingService} from '../../../data/services/messaging.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TasksManager} from '../../../data/managers/tasks.manager';
import {ProceduresManager} from '../../../data/managers/procedures.manager';
import {RolesManager} from '../../../data/managers/roles.manager';
import {BaseComponent} from '../../base-component/base-component';
import {DetailsBudgets} from '../../../data/model/details-budgets';

declare var $: any; //// meter funciones javascript

@Component({
  selector: 'app-create-details-component',
  templateUrl: './budgets-details.component.html'
})

export class BudgetsDetailsComponent extends BaseComponent implements OnInit {

  public listActivitiesFinancialTemp: Array<any> = [];
  public listActivitiesFinancial: Array<any> = [];
  public listActionsFinancial: Array<any> = [];
  public listDetailsFinancial: Array<any> = [];
  public listAssociatedFinancial: Array<any> = [];

  public listProject: Array<any> = [];
  public listProgram: Array<any> = [];
  public arrYear: Array<any> = [
    {
      name: 2018
    },
    {
      name: 2019
    },
    {
      name: 2020
    },
    {
      name: 2021
    },
    {
      name: 2022
    },
    {
      name: 2023
    },
    {
      name: 2024
    },
    {
      name: 2025
    },
    {
      name: 2026
    },
    {
      name: 2027
    },
    {
      name: 2028
    },
    {
      name: 2029
    },
    {
      name: 2030
    },
    {
      name: 2031
    },
    {
      name: 2032
    },
    {
      name: 2033
    },
    {
      name: 2034
    },
    {
      name: 2035
    },
    {
      name: 2036
    },
    {
      name: 2037
    },
    {
      name: 2038
    },
    {
      name: 2039
    },
    {
      name: 2040
    },
    {
      name: 2041
    },
    {
      name: 2042
    },
    {
      name: 2043
    },
    {
      name: 2044
    },
    {
      name: 2045
    },
    {
      name: 2046
    },
    {
      name: 2047
    },
    {
      name: 2048
    },
    {
      name: 2049
    },
    {
      name: 2050
    },
    {
      name: 2051
    },
    {
      name: 2052
    },
    {
      name: 2053
    },
    {
      name: 2054
    },
    {
      name: 2055
    },
    {
      name: 2056
    },
    {
      name: 2057
    },
    {
      name: 2058
    },
    {
      name: 2059
    },
    {
      name: 2060
    },
    {
      name: 2061
    },
    {
      name: 2062
    },
    {
      name: 2063
    },
    {
      name: 2064
    },
    {
      name: 2065
    },
    {
      name: 2066
    },
    {
      name: 2067
    },
    {
      name: 2068
    },
    {
      name: 2069
    },
    {
      name: 2070
    },
    {
      name: 2071
    },
    {
      name: 2072
    },
    {
      name: 2073
    },
    {
      name: 2074
    },
    {
      name: 2075
    },
    {
      name: 2076
    },
    {
      name: 2077
    },
    {
      name: 2078
    },
    {
      name: 2079
    },
    {
      name: 2080
    },
    {
      name: 2081
    },
    {
      name: 2082
    },
    {
      name: 2083
    },
    {
      name: 2084
    },
    {
      name: 2085
    },
    {
      name: 2086
    },
    {
      name: 2087
    },
    {
      name: 2088
    },
    {
      name: 2089
    },
    {
      name: 2090
    },
    {
      name: 2091
    },
    {
      name: 2092
    },
    {
      name: 2093
    },
    {
      name: 2094
    },
    {
      name: 2095
    },
    {
      name: 2096
    },
    {
      name: 2097
    },
    {
      name: 2098
    },
    {
      name: 2099
    },
    {
      name: 2100
    },
    {
      name: 2101
    },
    {
      name: 2102
    },
    {
      name: 2103
    },
    {
      name: 2104
    },
    {
      name: 2105
    },
    {
      name: 2106
    }
  ];
  @Input() public boolInModal: boolean;
  @Output() public sendReasindData = new EventEmitter<any>();

  public createDetail: DetailsBudgets = new DetailsBudgets();

  constructor(private router: Router,
              protected proceduresManager: ProceduresManager,
              private messagingService: MessagingService,
              protected tasksManager: TasksManager,
              public rolesManager: RolesManager) {
    super(proceduresManager, rolesManager);

  }

  ngOnInit(): void {
    this.messagingService.publish(new BusMessage('onRouteChanged', null));
    /// obtener contribuciones en actividades en financiero
    this.getActivitiesContributionFinancial();
    // Obtener listado de Programas y Proyectos
    this.getPromgramProjectDetailsBudget();

    if (this.boolInModal === undefined) {
      this.boolInModal = false;
    }
  }

  public getActivitiesContributionFinancial(): void {
    this.tasksManager.getActivitiesContributionFinancial()
      .then((response: any) => {
        if (response instanceof Array) {
          this.listActivitiesFinancialTemp = response;
          // console.log(this.listActivitiesFinancial);
        } else {
          this.listActivitiesFinancialTemp = [];
        }
      });
  }

  public getPromgramProjectDetailsBudget(): void {
    this.tasksManager.getPromgramProjectDetailsBudget()
      .then((response: any) => {
        if (response instanceof Array) {
          this.listProgram = response;
          // console.log(this.listActivitiesFinancial);
        } else {
          this.listProgram = [];
        }

        // console.log(this.listProgram);
      });
  }

  // al momento de escoger un programa se filtra por éste
  public setProgram(idProgram: any) {
    if (Number(idProgram) !== 0) {
      const listAll: any = this.listProgram.filter((program: any) => String(program.id) === String(idProgram));
      this.listProject = listAll[0].program_by_project;
      this.createDetail.project = '0';
      this.listActivitiesFinancial = [];

      this.listActionsFinancial = [];
      this.listDetailsFinancial = [];
      this.createDetail.associated = '0';
      this.createDetail.action = '0';
      this.createDetail.detail = '0';
      this.createDetail.value = '0';

    } else {
      this.listProject = [];
      this.createDetail.project = '0';

      this.listActivitiesFinancial = [];
      this.createDetail.activity = '0';

      this.listActionsFinancial = [];
      this.listDetailsFinancial = [];
      this.createDetail.action = '0';
      this.createDetail.detail = '0';
      this.createDetail.value = '0';
    }
  }

  // al momento de escoger un proyecto se filtra por éste
  public setProject(idProject: any) {
    if (Number(idProject) !== 0) {
      const listAll: any = this.listActivitiesFinancialTemp.filter((activities: any) => String(activities.project_id) === String(idProject));
      this.listActivitiesFinancial = listAll;
      this.createDetail.activity = '0';

      this.listActionsFinancial = [];
      this.listDetailsFinancial = [];
      this.createDetail.associated = '0';
      this.createDetail.action = '0';
      this.createDetail.detail = '0';
      this.createDetail.value = '0';
    } else {

      this.listActivitiesFinancial = [];
      this.createDetail.activity = '0';

      this.listActionsFinancial = [];
      this.listDetailsFinancial = [];
      this.createDetail.associated = '0';
      this.createDetail.action = '0';
      this.createDetail.detail = '0';
      this.createDetail.value = '0';
    }
  }

  // al momento de escoger una acción se filtra por éste
  public setActions(idActivity: any) {
    if (Number(idActivity) !== 0) {
      const listActions: any = this.listActivitiesFinancial.filter((activity: any) => String(activity.activite_id) === String(idActivity));
      this.listActionsFinancial = listActions[0].actions;
      this.listAssociatedFinancial = listActions[0].associates;
      this.listDetailsFinancial = [];
      this.createDetail.detail = '0';
      this.createDetail.associated = '0';
    } else {
      this.listActionsFinancial = [];
      this.listDetailsFinancial = [];
      this.createDetail.action = '0';
      this.createDetail.detail = '0';
      this.createDetail.value = '0';
      this.createDetail.quantity_measurement = '0';
      this.createDetail.associated = '0';
    }
  }

  // set valor del detalle
  public setDetails(idAction: any) {
    if (Number(idAction) !== 0) {
      const listDetails: any = this.listActionsFinancial.filter((action: any) => String(action.action_id) === String(idAction));
      this.listDetailsFinancial = listDetails[0].details;
    } else {
      this.listDetailsFinancial = [];
      this.createDetail.detail = '0';
      this.createDetail.value = '0';
      this.createDetail.quantity_measurement = '0';
    }
  }

  // setear value cambiar number to string
  public setValue(idDetail: any) {
    if (Number(idDetail) === 0) {
      this.createDetail.value = '0';
    }
  }

  // funcion macro de enviar detalle
  public sendDetail(): void {
    if (this.isValidDetails()) {
      if (this.boolInModal) {
        this.sendReasindData.emit(this.createDetail);
      } else {
        this.createDetailService();
      }
    }
  }

  // calculo multipicacion
  public multiply() {
    // decimal format
    if (this.createDetail.quantity && this.createDetail.value_unit && Number(this.createDetail.quantity) >= 0 && Number(this.createDetail.value_unit) >= 0) {

      if (this.createDetail.quantity_measurement && Number(this.createDetail.quantity_measurement) >= 0) {
        const result = String(Number(this.createDetail.value_unit) * Number(this.createDetail.quantity) * Number(this.createDetail.quantity_measurement));
        this.createDetail.value = result.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.');
      } else {
        const result = String(Number(this.createDetail.value_unit) * Number(this.createDetail.quantity));
        this.createDetail.value = result.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.');
      }

    } else {
      this.createDetail.value = '0';
    }
  }

  // formatear
  public formatSpecific(data: any, id: number) {
    // decimal format
    const result = data.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.');
    //// this.datosCosto.coste = result;
    if (id === 1) {
      $('#valueIngreso').val(result);
    }
    if (id === 2) {
      $('#value_unit').val(result);
    }

  }

  // validar datos
  protected isValidDetails(): boolean {

    if (Number(this.createDetail.activity) <= 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona la Actividad',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (Number(this.createDetail.action) <= 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona una Acción',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    // selacciona un asociado
    if (Number(this.createDetail.associated) <= 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona un Asociado',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    // detalle de la accion
    if (Number(this.createDetail.detail) <= 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Selecciona un Detalle de la Acción',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (this.createDetail.value === '0' || !this.createDetail.value || this.createDetail.value.length === 0) {
      const message = {
        'tipo': 'Error: ',
        'message': 'Ingresa el valor de Aporte',
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    if (!this.boolInModal) {
      if (Number(this.createDetail.year) === 0) {
        const message = {
          'tipo': 'Error: ',
          'message': 'Seleccione el año',
          'style': 'alert-danger'
        };
        this.messagingService.publish(new BusMessage('alerta', message));
        return false;
      }
    }
    if (Number(this.createDetail.value.replace('.', '')) > Number(this.createDetail.associated.contribution_inversion)) {
      const message = {
        'tipo': 'Error: ',
        'message': 'La cantidad no puede ser mayor al aporte total del asociado: ' + this.createDetail.associated.contribution_inversion,
        'style': 'alert-danger'
      };
      this.messagingService.publish(new BusMessage('alerta', message));
      return false;
    }
    return true;
  }

  // crear detqalle de servicio
  public createDetailService(): void {
    const componente = this;
    this.tasksManager.createDetailService(this.createDetail)
      .then(() => {
        const message = {
          'tipo': 'Detalle registrado ',
          'message': ' satisfactoriamente.',
          'style': 'alert-success'
        };
        componente.messagingService.publish(new BusMessage('alerta', message));

        const link = ['/app/view-list-details-budget'];
        this.router.navigate(link);

      }, function (reason: string) {
        ////console.log(reason);
        const message = {
          'tipo': 'Error',
          'message': reason,
          'style': 'alert-danger'
        };
        componente.messagingService.publish(new BusMessage('alerta', message));
      });
  }

}
